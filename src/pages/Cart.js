import React from 'react'
import {useSelector } from 'react-redux'
import CartContent from '../components/Cart/CartContent';
import EmptyCart from '../components/Cart/EmptyCart';
import useCart from '../components/Cart/hooks/useCart';
import Loader from '../components/UI/Loader';
function Cart() {
  const cartData = useSelector(({ cart }) => cart.list);
  const cartLength = cartData.length;
  const { isLoading } = useCart();
  return (
    <>
      {isLoading && <Loader />}
      {cartLength === 0 && <section className='empty-cart p-5'>
        <EmptyCart />
      </section>}
      {cartData && cartLength > 0 && <CartContent cartItems={cartData} />}
    </>
  )
}

export default Cart