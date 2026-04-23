import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blog", "routes/blog/index.tsx"),
  route("blog/:slug", "routes/blog/$slug.tsx"),
  route("projects/:slug", "routes/projects.$slug.tsx"),
  route("admin/login", "routes/admin/login.tsx"),
  route("admin", "routes/admin/index.tsx"),
  route("admin/posts/:id", "routes/admin/posts.$id.tsx"),
  route("admin/posts/:id/delete", "routes/admin/posts.$id.delete.tsx"),
] satisfies RouteConfig;
