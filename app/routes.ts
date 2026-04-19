import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog/index.tsx"),
  route("blog/:slug", "routes/blog/$slug.tsx"),
  route("projects/:slug", "routes/projects.$slug.tsx"),
] satisfies RouteConfig;
