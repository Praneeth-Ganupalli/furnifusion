import React from "react";
import furniImage from "../../assets/images/peakpx3.jpg";
function AboutContent() {
  return (
    <>
      <div className="container p-2 p-md-5">
        <div className="row">
          <div className="col-md-5 mb-4">
            <img src={furniImage} alt="furni" className="main-img about-img" />
          </div>
          <div className="col-md-6">
            <h3>Our Story</h3>
            <div className="underline ms-1"></div>
            <p className="lead mt-4">
              Welcome to Furnifusion, a furniture website dedicated to providing
              a seamless and enjoyable shopping experience for modern and
              traditional homes. Our collection features a wide range of stylish
              and affordable furniture options, from cozy living room sofas to
              practical office desks, to suit different styles and budgets. With
              a user-friendly website and a commitment to excellent customer
              service, Furnifusion is dedicated to helping you find the perfect
              pieces to transform your home into a reflection of your personal
              style. Subscribe to our newsletter to stay up-to-date on new
              arrivals, sales, and special offers, and join us on our mission to
              create beautiful and functional homes.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutContent;
