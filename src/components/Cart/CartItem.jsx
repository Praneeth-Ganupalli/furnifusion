import React, { useCallback } from 'react'
import ProductQtyContainer from '../Products/DetailedViews/ProductQtyContainer'
import { getFormattedPrice } from '../../helpers/helpers'
import {BsTrash} from "react-icons/bs"
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store'
function CartItem({item,isCheckoutMode}) {
 const {brand,title,color,image,cost,quantity,price,id}=item
 const displayCost=getFormattedPrice(cost);
 const dispatch=useDispatch();
 const qtyChangeHandler=useCallback((qty)=>{
    dispatch(cartActions.updateQuantity({
        id:id,
        price:price,
        quantity:qty
    }))
 },[dispatch,id,price])
 const removeCartItemHandler=()=>{
    dispatch(cartActions.removeCartItem(id))
 }
  return (
    <div className="card rounded-3 mb-4">
    <div className="card-body p-3 cart-item__container">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-md-2 col-lg-2 col-xl-2">
          <img
            src={image}
            className="img-fluid rounded-3 mb-2 cart-item__image"
            alt={title}
          />
        </div>
        <div className="col-md-3 col-lg-3 col-xl-3">
          <p className="lead fw-normal mb-2 text-capitalize">{title}</p>
          <div>
            <div className="text-muted text-capitalize">Brand: {brand}</div>
            <div className="text-muted">Color: <span style={{backgroundColor:color}} className="cart-item__color"></span></div>
            <div className="text-capitalize cart-item__price">Price: {getFormattedPrice(price)}</div>
          </div>
        </div>
        <div className={`col-md-3 col-lg-3 col-xl-2 d-flex fw-bold ${isCheckoutMode ? "cart-no-edit":""}`}>
          <ProductQtyContainer intialQuantity={quantity} onQtyChange={qtyChangeHandler} />
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h5 className="mb-0 text-custom__primary fw-bolder">{displayCost}</h5>
        </div>
        <div className={`col-md-1 col-lg-1 col-xl-1 text-end ${isCheckoutMode ? "cart-no-edit":""}`} >
            <span onClick={removeCartItemHandler}>
                <BsTrash   className="text-danger cursor-pointer" />
            </span>
        </div>
      </div>
    </div>
  </div>
  )
}

export default CartItem