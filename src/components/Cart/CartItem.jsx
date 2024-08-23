import React, { Fragment, useCallback } from "react";
import ProductQtyContainer from "../Products/DetailedViews/ProductQtyContainer";
import { getFormattedPrice } from "../../helpers/helpers";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store";
import Loader from "../UI/Loader";
import useCart from "./hooks/useCart";
function CartItem({ item, isCheckoutMode }) {
  const { brand, title, color, image, cost, quantity, price, _id, max } = item;
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { isLoading, removeItemFromCart, updateQuantity } = useCart();
  const displayCost = getFormattedPrice(cost);
  const dispatch = useDispatch();
  const qtyChangeHandler = useCallback(
    async (qty) => {
      if (isLoggedIn) {
        const action = qty > quantity ? "inc" : "dec";
        await updateQuantity(_id, action);
      }
      dispatch(
        cartActions.updateQuantity({
          _id,
          price: price,
          quantity: qty,
        })
      );
    },
    [dispatch, _id, price, quantity, isLoggedIn, updateQuantity]
  );
  const removeCartItemHandler = async () => {
    if (isLoggedIn) {
      await removeItemFromCart(_id);
    }
    dispatch(cartActions.removeCartItem(_id));
  };
  return (
    <>
      {isLoading && <Loader />}
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
                <div className="text-muted">
                  Color:{" "}
                  <span
                    style={{ backgroundColor: color }}
                    className="cart-item__color"
                  ></span>
                </div>
                <div className="text-capitalize cart-item__price">
                  Price: {getFormattedPrice(price)}
                </div>
              </div>
            </div>
            <div
              className={`col-md-3 col-lg-3 col-xl-2 d-flex fw-bold ${
                isCheckoutMode ? "cart-no-edit" : ""
              }`}
            >
              <ProductQtyContainer
                intialQuantity={quantity}
                onQtyChange={qtyChangeHandler}
                totalQty={max}
              />
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 className="mb-0 text-custom__primary fw-bolder">
                {displayCost}
              </h5>
            </div>
            <div
              className={`col-md-1 col-lg-1 col-xl-1 text-end ${
                isCheckoutMode ? "cart-no-edit" : ""
              }`}
            >
              <span onClick={removeCartItemHandler}>
                <BsTrash className="text-danger cursor-pointer" />
              </span>
            </div>
          </div>
          <div className="row mt-2">
            <p>Max Quantity for this product is {max}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
