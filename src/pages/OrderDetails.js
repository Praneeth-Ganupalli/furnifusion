import React from 'react'
import { useParams } from 'react-router-dom'
import OrderDetailedInfo from "../components/Order/OrderDetails";
const OrderDetails = () => {
  const {orderId} = useParams();
  return <OrderDetailedInfo  orderId={decodeURIComponent(orderId)} />  
}

export default OrderDetails