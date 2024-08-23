import React from "react";
import "./loader.css";
import { createPortal } from "react-dom";
function Loader() {
  return createPortal(
    <>
      <div className="d-flex justify-content-center site-loader__container">
        <div className="spinner-border site-spinner" role="status"></div>
      </div>
    </>,document.getElementById('fullscreen')
  );
}

export default Loader;
