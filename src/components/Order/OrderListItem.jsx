import React from 'react'
import { getFormattedPrice } from '../../helpers/helpers';
import { Link } from 'react-router-dom';
const OrderListItem = ({order}) => {
  const {createdAt,total,products,_id} = order;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  return (
    <article className='p-3 m-3 order-card'>
        <h3>Order ID <strong>#{_id}</strong></h3>
        <p>Date: {formattedDate}</p>
        <p>Items:{products.length}</p>
        <p>Total:{getFormattedPrice(total)}</p>
        <Link to={`/orders/${_id}`} className='text-link text-decoration-none'>View Details</Link>
    </article>
  )
}

export default OrderListItem