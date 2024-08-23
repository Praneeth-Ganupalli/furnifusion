import React, { Fragment, useEffect, useState } from "react";
import useOrders from "../../helpers/hooks/useOrders";
import Loader from "../UI/Loader";
import { getFormattedPrice } from "../../helpers/helpers";
import OrderItem from "./OrderItem";
import { useDispatch } from "react-redux";
import { breadCrumbActions } from "../../store";
const OrderDetails = ({ orderId }) => {
  const { isLoading, fetchOrderDetails, error } = useOrders();
  const [orderInfo, setOrderInfo] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      const orderDetails = await fetchOrderDetails(orderId);
      if (orderDetails) {
        setOrderInfo(orderDetails);
        dispatch(
          breadCrumbActions.updateBreadcrumbs([
            {
              name: "Orders",
              path: "/orders",
            },
            {
              name: orderId,
              active: true,
            },
          ])
        );
      }
    })();
  }, [fetchOrderDetails, orderId,dispatch]);
  return (
    <>
      {isLoading && <Loader />}
      {error && <p className="text-danger">{error}</p>}
      {orderInfo && (
        <section className="p-5 m-3">
          <p>Order ID: #{orderId} </p>
          <p>Date: {new Date(orderInfo.createdAt).toLocaleDateString()}</p>
          <p>Status:{orderInfo.status} </p>
          <h3>Items Purchased</h3>
          <ul className="mt-2 py-2 px-3" type="none">
            {orderInfo.products.map((prd, index) => {
              return <OrderItem product={prd} key={index} />;
            })}
          </ul>
          <p className="text-end">
            Total Amount <strong>{getFormattedPrice(orderInfo.total)}</strong>
          </p>
        </section>
      )}
    </>
  );
};

export default OrderDetails;
