import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
function AppLayout({ children }) {
    const currentRoute =useLocation();
    const showBreadCrumb=currentRoute.pathname!=="/home"
    const curPathName=currentRoute.pathname.replace("/","");
  return (
    <>
      <header>
        <Header />
        {showBreadCrumb && <BreadCrumb activePath={curPathName} />}
      </header>
      <main>
        {children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default AppLayout;
