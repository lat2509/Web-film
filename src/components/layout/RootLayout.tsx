import { Outlet } from "@tanstack/react-router";
import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
