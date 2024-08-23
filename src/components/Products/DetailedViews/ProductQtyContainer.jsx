import React, { useEffect, useState } from 'react'
import {FaMinus,FaPlus} from "react-icons/fa"
function ProductQtyContainer({onQtyChange,intialQuantity,totalQty}) {
  const [qty,setQty]=useState(null);
  const incrementQty=()=>{
    const newQty=qty+1>=totalQty?totalQty:qty+1;
    setQty(newQty);
    onQtyChange(newQty);
  }
  const decrementQty=()=>{
    if(qty===1) return;
    const newQty=qty-1;
    setQty(newQty);
    onQtyChange(newQty);
  }
  useEffect(()=>{
      setQty(intialQuantity)
  },[intialQuantity])
  return (
    <div className="d-flex atc-product__qty__wrapper">
        <h5 className={`fw-bolder ${qty===1?'no-action':'cursor-pointer'}`} onClick={decrementQty}><FaMinus /></h5>
        <h2>{qty}</h2>
        <h5 className={`fw-bolder ${qty===totalQty?'no-action':'cursor-pointer'}`} disabled={qty===totalQty} onClick={()=>{
          if(qty!==totalQty)
          {
            incrementQty();
          }
        }}><FaPlus /></h5>
    </div>
  )
}

export default ProductQtyContainer