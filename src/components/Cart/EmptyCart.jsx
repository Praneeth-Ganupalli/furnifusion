import React from "react";
import { Link } from "react-router-dom";
import emptycart from "../../assets/images/emptycart.png";
function EmptyCart() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 empty-cart-image">
            <img src={emptycart} alt="empty-cart" height={350}/>
          </div>
          <div className="col-md-6 mt-5">
              <p className="lead">
                You dont have any items added to your cart Please Explore wide
                variety of products and add them to your cart
              </p>
              <Link to="/products">
                <button className="btn btn btn-custom__primary btn-block mt-1 btn-lg w-25 fill-it-btn">
                  Fill it
                </button>
              </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmptyCart;
