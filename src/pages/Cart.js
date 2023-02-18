import React from 'react'
import { useSelector } from 'react-redux'
import CartContent from '../components/Cart/CartContent';
function Cart() {
 const cartData=useSelector(({cart})=>cart.list);
  return (
    <>
        { cartData && cartData.length>0 && <CartContent cartItems={cartData} />}
    </>
  )
}

export default Cart