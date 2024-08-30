import React from 'react'
import { getFormattedPrice } from '../../helpers/helpers';
import { Link } from 'react-router-dom';
import ButtonLoader from "../UI/ButtonLoader";
import useOrders from '../../helpers/hooks/useOrders';
const OrderListItem = ({order}) => {
  const {createdAt,total,products,_id} = order;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const {downloadOrderInvoice,isLoading,error} = useOrders();
  return (
    <article className='p-3 m-3 order-card'>
        <h3>Order ID <strong>#{_id}</strong></h3>
        <p>Date: {formattedDate}</p>
        <p>Items:{products.length}</p>
        <p>Total:{getFormattedPrice(total)}</p>
        <Link to={`/orders/${_id}`} className='text-link text-decoration-none'>View Details</Link>
        <ButtonLoader text="Download Invoice" isLoading={isLoading} clickCb={()=>{downloadOrderInvoice(_id)}} className="ms-2 btn btn-outline-primary border-0 invoice-download-btn"  />
        {error && <p className='text-danger mt-2 p-1'>{error}</p>}
    </article>
  ) 
}

export default OrderListItem