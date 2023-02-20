import React from 'react'
import { useSelector } from 'react-redux'
import CartContent from '../components/Cart/CartContent';
import EmptyCart from '../components/Cart/EmptyCart';
function Cart() {
  const cartData = useSelector(({ cart }) => cart.list);
  return (
    <>
      {cartData.length === 0 && <section className='empty-cart p-5'>
        <EmptyCart />
      </section>}
      {cartData && cartData.length > 0 && <CartContent cartItems={cartData} />}
    </>
  )
}

export default Cart