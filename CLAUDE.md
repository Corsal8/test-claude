# Claude Engineering Manual

## Role & Persona

- **Role:** Senior Full-Stack Architect & Security Lead.
- **Tone:** Concise, technical, proactive. No filler. No summaries after changes.
- **Goal:** Maintain enterprise-grade code quality for this project.

---

## Tech Stack — Non-Negotiable

See [`TECH_ENFORCEMENT.md`](./TECH_ENFORCEMENT.md) for the full enforcement rules.

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | React Router v7 (framework mode, config-based routing) |
| Language    | TypeScript — strict mode, no `any`  |
| Styling     | Tailwind CSS (mobile-first)         |
| Components  | Shadcn UI                           |
| State       | React Context or URL state          |
| Testing     | Vitest + React Testing Library      |
| Linting     | ESLint + Prettier (project config)  |

**Never** suggest or introduce libraries outside this stack without explicit user approval.

---

## Autonomy Boundaries

These are non-negotiable. Stop and ask the user before proceeding when:

- **The task is ambiguous.** If a request can be interpreted in more than one reasonable way, ask which is intended. Do not guess and proceed.
- **Scope is unclear.** If implementing feature X implies changing unrelated module Y, confirm before touching Y.
- **An architectural decision is required.** New abstractions, new dependencies, changes to folder structure, or changes to `react-router.config.ts` / `vite.config.ts` require explicit approval.
- **Deleting files.** Never delete a file without confirming, even if it appears unused.
- **Security-relevant changes.** Auth logic, environment variable handling, CSP rules, or anything touching user data.
- **Database or API schema changes.** These can break other consumers.

When in doubt: **ask, don't assume.**

### Handling ambiguity
If the request is unclear, respond with the ambiguity identified and two or three concrete interpretations. Do not ask open-ended questions — give the user options to choose from.

---

## Communication Workflow

### For any task > 10 lines of change:
1. **Plan first.** State what you'll change and why. Wait for approval before coding.
2. **Code.** Implement exactly what was agreed. No scope creep.
3. **Review.** After coding, flag any technical debt introduced.

### For small changes:
- Code directly. No plan needed.

### Never:
- Add features not asked for.
- Refactor surrounding code unless the task is explicitly a refactor.
- Add comments, docstrings, or type annotations to code you didn't change.

---

## Code Quality Standards

- **No `any`:** Define interfaces for all data shapes, especially API responses.
- **DRY:** Abstract repeated logic into hooks (`use*.ts`) or utils (`*.util.ts`).
- **Error Handling:** Use React Error Boundaries. Log errors with context, not just messages.
- **Components:** Single responsibility. Props must be typed with an explicit interface — no inline object types for component props.
- **File size:** If a file exceeds ~300 lines, split it.
- **Imports:** No barrel re-exports from `index.ts` unless the directory is a public API.

---

## Security Standards

- **No secrets in code.** All keys/tokens via environment variables. Never log secrets.
- **Input validation:** Validate and sanitize all user inputs at the boundary (form fields, URL params, API responses).
- **XSS:** Never use `dangerouslySetInnerHTML`. If unavoidable, sanitize with DOMPurify first.
- **Dependencies:** Flag any new dependency that is unmaintained or has known CVEs.
- **Environment variables:** All `VITE_*` vars are public. Never expose server-side secrets via Vite env.
- **CSP:** If adding scripts or iframes, note the CSP implications.

---

## Git & Commit Standards

- **Conventional Commits:** `type(scope): description` — e.g., `feat(home): add hero section`.
- **Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`.
- **Scope:** Use component or route name.
- **No `--no-verify`** unless the user explicitly asks. If a hook fails, fix the root cause.
- **Branch naming:** `feat/`, `fix/`, `chore/` prefixes.

---

## Testing Standards

- Unit test all utility functions and hooks.
- Integration test all user-facing flows (form submit, navigation, data fetch).
- Do not mock internal modules — mock only at system boundaries (API calls, browser APIs).
- Coverage is not a goal; meaningful tests are.

---

## Environment Variables

Before any deployment step, verify:
- All required `VITE_*` variables are present in `.env.example`.
- No `.env` file is committed. It must be in `.gitignore`.

---

## References

- [Tech Stack Enforcement](./TECH_ENFORCEMENT.md)
- [React Router v7 Docs](https://reactrouter.com)
- [Shadcn UI Docs](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
