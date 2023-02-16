import React, { useState } from 'react'
import {FaMinus,FaPlus} from "react-icons/fa"
function ProductQtyContainer() {
  const [qty,setQty]=useState(1);
  const incrementQty=()=>{
    setQty(prevQty=>prevQty+1)
  }
  const decrementQty=()=>{
    if(qty===1) return;
    setQty(prevQty=>prevQty-1)
  }
  return (
    <div className="d-flex atc-product__qty__wrapper">
        <h5 className='fw-bolder cursor-pointer' onClick={decrementQty}><FaMinus /></h5>
        <h2>{qty}</h2>
        <h5 className='fw-bolder cursor-pointer' onClick={incrementQty}><FaPlus /></h5>
    </div>
  )
}

export default ProductQtyContainer