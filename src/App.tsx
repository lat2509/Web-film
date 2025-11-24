import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import Header from "./components/layout/Header";
import "../src/styles/index.css";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import MoviePopular from "./components/movie/MoviePopular";
import TvShowsPopular from "./components/tv series/TvShowsPopular";
import NowPlayingMovie from "./components/movie/NowPlayingMovie";
import UpcomingMovie from "./components/movie/UpcomingMovie";
import TopRatedMovie from "./components/movie/TopRatedMovie";
import { airingTVshows } from "./api/moviesApi";
import AiringTodayTvShow from "./components/tv series/AiringTodayTvShow";
import OnTheAirTvShow from "./components/tv series/OnTheAirTvShow";
import TopRatedTvShow from "./components/tv series/TopRatedTvShow";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
});

// Route Trang chủ (path: /)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

// Route Popular (path: /movie/popular)
const popularMovieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/popular",
  component: MoviePopular,
});

const nowPlayingMovieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/now-playing",
  component: NowPlayingMovie,
});

const upcomingMovieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/upcoming",
  component: UpcomingMovie,
});

const topRatedMovieRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/top-rated",
  component: TopRatedMovie,
});

const popularTvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tv/popular",
  component: TvShowsPopular,
});

const airingTodayTvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tv/airing-today",
  component: AiringTodayTvShow,
});

const onTheAirTvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tv/on-the-air",
  component: OnTheAirTvShow,
});

const topRatedTvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tv/top-rated",
  component: TopRatedTvShow,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  popularMovieRoute,
  nowPlayingMovieRoute,
  upcomingMovieRoute,
  topRatedMovieRoute,
  popularTvRoute,
  airingTodayTvRoute,
  onTheAirTvRoute,
  topRatedTvRoute,
]);

const router = createRouter({ routeTree });

//Đăng ký TypeScript (Để khi gõ Link nó tự gợi ý)
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
