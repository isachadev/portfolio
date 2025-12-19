import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("project/:slug", "routes/project.$slug.tsx"),
] satisfies RouteConfig;