import React, { Fragment, useEffect, useState } from "react";
import useOrders from "../../helpers/hooks/useOrders";
import Loader from "../UI/Loader";
import OrderListItem from "./OrderListItem";
const OrderHistory = () => {
  const { error, fetchUserOrders, isLoading } = useOrders();
  const [orderList, setOrderList] = useState(null);
  useEffect(() => {
    (async function () {
      const data = await fetchUserOrders();
      if (data) {
        setOrderList(data);
      }
    })();
  }, [fetchUserOrders]);
  return (
    <Fragment>
      <h1 className="m-3">Order History</h1>
      {isLoading && <Loader />}
      {error && <p className="text-danger">{error}</p>}
      {
        orderList?.length===0 && <p>No Orders Found</p>
      }
      {
        orderList?.map((order,index)=>{
            return <OrderListItem order={order} key={index}/>
        })
      }
    </Fragment>
  );
};

export default OrderHistory;
