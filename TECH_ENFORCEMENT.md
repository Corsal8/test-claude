# Tech Stack Enforcement Rules

This document is referenced by `CLAUDE.md` and defines precise rules for allowed patterns, forbidden patterns, and architectural decisions.

---

## React Router v7

### Routing — Config-Based (not file-based)
All routes are registered explicitly in `app/routes.ts` using helpers from `@react-router/dev/routes`. Route modules live in `app/routes/` but **must** be registered in `routes.ts` to be active.

```ts
// app/routes.ts
import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  layout("routes/layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    ...prefix("blog", [
      index("routes/blog/index.tsx"),
      route(":slug", "routes/blog/post.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
```

Available helpers: `index`, `route`, `layout`, `prefix`, `relative`.

### Rendering Strategy
`react-router.config.ts` controls rendering per-project:
- **`ssr: true`** — Server-side rendering (default). Use for dynamic pages.
- **`prerender`** — Statically pre-render specific routes at build time. Always prefer this for pages with no per-request data.

```ts
// react-router.config.ts
export default {
  ssr: true,
  prerender: ["/", "/about", "/projects"], // statically built at deploy time
} satisfies Config;
```

For fully dynamic routes (e.g., `/blog/:slug`), add them via an async `prerender` function that returns all known paths.

### Data Loading & Mutations
- Use `loader` / `action` functions for data fetching and mutations — not `useEffect` for initial data.
- Use `useFetcher` for non-navigation mutations (e.g., liking a post without navigating).
- Use `<Link>` and `<NavLink>` — never raw `<a>` tags for internal links.

### Forbidden
- Do NOT use React Router v5/v6 patterns (`<Switch>`, `<Route>`, `useHistory`).
- Do NOT fetch data inside components on mount (`useEffect + fetch`). Use loaders.
- Do NOT use `navigate()` for form submissions — use `<Form>` with actions.
- Do NOT manually create route files without registering them in `app/routes.ts`.

---

## TypeScript

### Required
- `tsconfig.json` must have `"strict": true`.
- All component props must have a named interface: `interface ButtonProps { ... }`.
- All API response shapes must have a named interface or type alias.
- Use `unknown` instead of `any` when the type is genuinely unknown; then narrow it.
- Prefer `type` for unions/primitives, `interface` for object shapes.

### Forbidden
- `any` — zero exceptions.
- `@ts-ignore` — fix the type error instead.
- `@ts-expect-error` — only allowed in test files, with a comment explaining why.
- Type assertions (`as SomeType`) without a preceding narrowing check.

---

## Tailwind CSS

### Required
- Mobile-first: base styles = mobile, use `md:`, `lg:` for larger screens.
- Use the project's design tokens (colors, spacing) defined in `tailwind.config.ts`.
- Extract repeated class sets into a component or use `@apply` in a CSS module if used >3 times.

### Forbidden
- Inline `style={{}}` for anything Tailwind can handle.
- Magic numbers in classes — use spacing scale (`p-4`, not `p-[17px]`).
- Do NOT override Tailwind's reset with global CSS unless there's a documented reason.

---

## Shadcn UI

### Required
- Install components via `npx shadcn@latest add <component>`.
- Customize via the component file in `components/ui/` — do not override via CSS globally.
- Use Shadcn's built-in accessibility props (`aria-*`, `role`) as provided.

### Forbidden
- Do NOT wrap Shadcn components in unnecessary divs just to add Tailwind classes — apply classes directly via `className`.
- Do NOT import from `@radix-ui/*` directly if a Shadcn wrapper exists.

---

## State Management

### Allowed
- `useState` / `useReducer` for local component state.
- React Context for global UI state (theme, auth).
- URL search params for filterable/shareable state.
- React Router `loader` data for server/async state.

### Forbidden
- Redux, Zustand, Jotai, or any external state library — unless explicitly approved.
- Storing server data in Context (use loader data instead).

---

## File & Folder Conventions

```
app/
  routes.ts       # Single source of truth for ALL route registration
  root.tsx        # Root layout (HTML shell, global providers)
  routes/         # Route modules — must be registered in routes.ts
  components/     # Shared UI components
    ui/           # Shadcn-generated components (do not edit manually)
  hooks/          # Custom React hooks (use*.ts)
  utils/          # Pure utility functions (*.util.ts)
  types/          # Shared TypeScript interfaces/types
  styles/         # Global styles only (minimal)
```

- Component files: `PascalCase.tsx`
- Hook files: `useCamelCase.ts`
- Util files: `camelCase.util.ts`
- Type files: `camelCase.types.ts`

---

## Dependencies Policy

Before adding any new package:
1. Check it has been updated in the last 12 months.
2. Check it has no critical CVEs (`npm audit`).
3. Prefer packages with < 5 peer dependencies.
4. If a native browser API or a small utility can replace it — use that instead.

---

## Forbidden Patterns (Global)

| Pattern | Reason |
|---|---|
| `dangerouslySetInnerHTML` | XSS risk |
| `eval()` / `new Function()` | Code injection |
| Hardcoded secrets or API keys | Security |
| `console.log` in production code | Use structured logging |
| Relative imports with `../../../` depth > 2 | Use path aliases (`~/`) |
| Default exports for components | Named exports are traceable |
