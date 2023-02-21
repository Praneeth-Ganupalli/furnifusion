import React from 'react'
import { getFormattedPrice } from '../../helpers/helpers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function CartSummary({cartData}) {
  const navigate=useNavigate();
  const {isLoggedIn}=useSelector((state)=>state.login);
  const totalCartProducts=cartData.length;
  const cartCount=cartData.reduce((cur,acc)=>{
    return cur+acc.quantity;
  },0)
  const cartSubTotal=cartData.reduce((cur,acc)=>{
    return cur+acc.cost;
  },0)
  const ordTotal=cartSubTotal+3000.55;
  const orderTotal=getFormattedPrice(ordTotal)
  const formattedSubTotal=getFormattedPrice(cartSubTotal);
  const signInHandler=()=>{
    navigate("/login?fromCart=true");
  }
  return (
    
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">Order Summary</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Product(s)
                <span>{totalCartProducts}</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Total Quantity
                <span>{cartCount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                Shipping
                <span>Blue Dart</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Subtotal:
                <span>{formattedSubTotal}</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                Shipping Fee
                <span>{getFormattedPrice(3000.55)}</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-1">
                <div>
                  <strong>Total amount</strong>
                </div>
                <span><strong>{orderTotal}</strong></span>
              </li>
            </ul>
            <div className="form-outline input-group d-flex mb-3">
              <input type="text" id="form1" className="form-control" placeholder='Coupon code' />
              <button type="button" className="btn btn-warning text-white">Apply</button>
            </div>
            {!isLoggedIn && <button type="button" onClick={signInHandler} className="btn btn-info text-white btn-lg btn-block w-100">
              Sign in to Checkout
            </button>}
            {isLoggedIn && <button type="button" className="btn btn-info text-white btn-lg btn-block w-100">
              Place Order
            </button>}
          </div>
        </div>
  )
}

export default CartSummary