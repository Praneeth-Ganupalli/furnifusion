import React from "react";

function NewsLetter() {
  return (
    <>
      <header></header>
      <div className="container mt-3">
        <h2>Join our newsletter and get 20% off</h2>
        <div className="row mt-3">
          <div className="col-md-6">
            <p className="lead">
              The Furnifusion newsletter keeps subscribers up to date on new
              arrivals, sales, and special offers. By subscribing, customers can
              stay informed and take advantage of exclusive discounts, making it
              easier and more affordable to create their dream home.
            </p>
          </div>
          <div className="col-md-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email Here.."
                />
                <button className="btn btn-block btn-custom__primary">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsLetter;
