import React from "react";
import furnitureMain from "../../assets/images/peakpx1.jpg";
import { useNavigate } from "react-router-dom";
function HomeStartContent() {
  const navigate=useNavigate();
  const shopNowBtnHandler=()=>{
    navigate("/products")
  }
  return (
    <article className="container mt-5">
      <div className="row">
        <div className="col-md-5 static-info">
          <header>
            <h1>Design Your Comfort</h1>
            <p className="lead my-4">
              Furnifusion is your one-stop-shop for all your furniture needs.
              With a vast collection of stylish and affordable furniture
              options, our website promises to make your home décor dreams a
              reality. From modern to traditional, we have something for
              everyone. Browse our collections today and start creating the home
              you've always wanted.
            </p>
            <button type="button" className="btn btn-lg btn-custom__primary" onClick={shopNowBtnHandler}>
              Shop Now
            </button>
          </header>
        </div>
        <div className="col-md-7 ms-auto mobile-none">
          <img src={furnitureMain} alt="smll-furn" className="main-img" />
        </div>
      </div>
    </article>
  );
}

export default HomeStartContent;
