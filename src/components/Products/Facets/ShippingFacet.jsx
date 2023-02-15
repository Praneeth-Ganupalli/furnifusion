import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { productActions } from '../../../store';
function ShippingFacet({intialValue}) {
    const intLocValue=intialValue;
    const dispatch=useDispatch();
    const [isChecked,setIsChecked]=useState(false);
    useEffect(()=>{
        if(intLocValue==="")
        {
            setIsChecked(false);
        }
    },[intLocValue])
    const handleCheckBoxChange=(e)=>{
        dispatch(productActions.applyFilters({
            type:"shipping",
            keyword:e.target.checked
        }))
        setIsChecked(e.target.checked)
    }

  return (
    <section className="free-shipping-section mb-2 mt-3">
    <div className="form-check ps-0">
    <label className="form-check-label " htmlFor="flexCheckDefault">
       Free Shipping
      </label>
      <input
        className="form-check-input ms-3 float-none"
        type="checkbox"
        id="flexCheckDefault"
        checked={isChecked}
        onChange={handleCheckBoxChange}
      />
    </div>
  </section>
  )
}

export default ShippingFacet