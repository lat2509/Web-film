import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Header from "./components/layout/Header";
import "../src/styles/index.css";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import MoviePopular from './components/movie/MoviePopular';

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
  path: '/',
  component: Home,
});

// Route Popular (path: /movie/popular)
const popularRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/movie/popular',
  component: MoviePopular,
});

const routeTree = rootRoute.addChildren([indexRoute, popularRoute]);

const router = createRouter({ routeTree });

//Đăng ký TypeScript (Để khi gõ Link nó tự gợi ý)
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;