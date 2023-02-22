import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css"
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store";
import CheckoutForm from "../Checkout/CheckoutForm";
function CartContent({cartItems}) {
    const dispatch=useDispatch();
    const clearCartHandler=()=>{
        dispatch(cartActions.clearCart())
    }
  const[showCheckout,setCheckout]=useState(false);
  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className=" ms-3  mb-4">
              <h3 className="fw-normal mb-0 text-black mb-2">Shopping Cart</h3>
              <h6 className="fw-normal mb-0 text-black">You have <strong>{cartItems.length}</strong> items in your cart</h6>
            </div>
          </div>
          <div className="row">
          {<div className="col-md-8">
          {
            cartItems.map((cartItem)=>{
                return <CartItem isCheckoutMode={showCheckout} item={cartItem} key={cartItem.id} />
            })
          }
          {!showCheckout && <section className="cart-button-section mt-2 mb-3 d-flex">
            <Link to="/products">
            <button className="btn btn-lg btn-block btn-custom__primary">
                Continue Shopping
            </button>
            </Link>
            <button className="btn btn-lg btn-block ms-auto w-25 btn-clear-cart" onClick={clearCartHandler}>
                Clear Cart
            </button>
          </section>}
          </div>}
          <div className="col-md-4">
            {!showCheckout && <CartSummary cartData={cartItems} onCheckoutShow={()=>{setCheckout(true)}} />}
           { showCheckout && <CheckoutForm onSummaryShow={()=>{setCheckout(false)}} />}
          </div>
          </div>
         
          
        </div>
      </div>
    </section>
  );
}

export default CartContent;
