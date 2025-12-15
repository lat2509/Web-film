// src/router.ts
import { createRouter, createRoute, createRootRoute } from "@tanstack/react-router";
import RootLayout from "@components/layout/RootLayout";
import Home from "@pages/Home";
import Approved from "@pages/Approved";
import CatalogPage from "@pages/CatalogPage";
import SearchResultsPage from "@pages/SearchResultsPage";
import z from "zod";
import MovieDetailPage from "@pages/MovieDetailPage";

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

const movieSearchSchema = z.object({
  query: z.string().optional().default(""),
  page: z.number().optional().default(1),
});

const searchResultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchResultsPage,
  validateSearch: (search) => movieSearchSchema.parse(search),
});

const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `$mediaType/$id`,
  component: MovieDetailPage,
  parseParams: (params) => ({
    mediaType: params.mediaType as "movie" | "tv",
    id: params.id,
  }),
});

// 3. Route Tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  catalogRoute,
  approvedRoute,
  searchResultRoute,
  movieDetailRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
