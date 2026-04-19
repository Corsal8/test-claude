import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  // Statically pre-render these routes at build time.
  // Add any route with no per-request dynamic data here.
  // For dynamic routes (e.g. /blog/:slug), replace with an async function
  // that returns all known paths: async prerender({ getStaticPaths }) { ... }
  prerender: ["/"],
} satisfies Config;
