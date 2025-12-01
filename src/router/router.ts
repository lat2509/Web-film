// src/router.ts
import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import RootLayout from "@components/layout/RootLayout";
import Home from "@pages/Home";
import Approved from "@pages/Approved";
import CatalogPage from "@pages/CatalogPage";

// 1. Root Route
const rootRoute = createRootRoute({
  component: RootLayout,
});

// 2. Index Route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

// --- DYNAMIC ROUTE
export const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/browse/$mediaType/$category",
  component: CatalogPage,
});

// Other Routes
const approvedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/approved",
  component: Approved,
});

// 3. Route Tree ư
const routeTree = rootRoute.addChildren([indexRoute, catalogRoute, approvedRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
