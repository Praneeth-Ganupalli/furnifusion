import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css"
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store";
import CheckoutForm from "../Checkout/CheckoutForm";
import useCart from "./hooks/useCart";
import ButtonLoader from "../UI/ButtonLoader";
import {loadStripe} from '@stripe/stripe-js/pure';
import { STRIPE_PUBLIC_KEY } from "../../helpers/constants";

function CartContent({cartItems}) {
    const dispatch=useDispatch();
    const {isLoading,clearCart} = useCart();
    const {isLoggedIn} = useSelector(state=>state.auth); 
    const clearCartHandler=async ()=>{
        if(isLoggedIn)
        {
            await clearCart();
        }
        dispatch(cartActions.clearCart())
    }
    const buyNowHandler = async(sessionId)=>{
      const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
      sessionStorage.setItem('checkoutSessionId',sessionId);
      stripe.redirectToCheckout({
        sessionId:sessionId
      })
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
                return <CartItem isCheckoutMode={showCheckout} item={cartItem} key={cartItem._id} />
            })
          }
          {!showCheckout && <section className="cart-button-section mt-2 mb-3 d-flex">
            <Link to="/products">
            <button className="btn btn-lg btn-block btn-custom__primary">
                Continue Shopping
            </button>
            </Link>
            <ButtonLoader isLoading={isLoading} text='Clear Cart' clickCb={clearCartHandler} className="btn btn-lg btn-block ms-auto w-25 btn-clear-cart"    />
          </section>}
          </div>}
          <div className="col-md-4">
            {!showCheckout && <CartSummary cartData={cartItems} onCheckoutClick={buyNowHandler} />}
           { showCheckout && <CheckoutForm onSummaryShow={()=>{setCheckout(false)}} />}
          </div>
          </div>
         
          
        </div>
      </div>
    </section>
  );
}

export default CartContent;
