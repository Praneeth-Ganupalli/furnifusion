import React from 'react'
import "./loader.css"
function Loader() {
  return (
    <div className="d-flex justify-content-center site-loader__container">
    <div className="spinner-border site-spinner" role="status">
    </div>
  </div>
  )
}

export default Loader