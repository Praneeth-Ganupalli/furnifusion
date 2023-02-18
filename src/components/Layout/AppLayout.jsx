import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import { useDispatch } from "react-redux";
import { breadCrumbActions } from "../../store";
function AppLayout({ children }) {
    const dispatch=useDispatch();
    const currentRoute =useLocation();
    const restrictedPaths=["/home","/login"]
    const showBreadCrumb=!restrictedPaths.includes(currentRoute.pathname);
    const curPathName=currentRoute.pathname.replace("/","");
    const {pid}=useParams();
    useEffect(()=>{
      if(showBreadCrumb && !pid)
      {
        dispatch(breadCrumbActions.setBreadCrumbs({
          name:curPathName,
          path:currentRoute.pathname,
          active:true
        }))
      }
    },[showBreadCrumb,currentRoute,dispatch,curPathName,pid])
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
