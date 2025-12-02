import { Outlet, useRouterState } from "@tanstack/react-router";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

const RootLayout = () => {
  const router = useRouterState();
  return (
    <>
      <Header key={router.location.pathname} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
