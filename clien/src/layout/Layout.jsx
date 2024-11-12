import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RouterPage from "../Router/RouterPage";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <RouterPage />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
