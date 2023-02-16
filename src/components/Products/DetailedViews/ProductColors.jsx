import React, {useState } from 'react'
import {BsCheck} from "react-icons/bs"
function ProductColors({colorFilters,intialColor}) {
    const [currentColor,setCurrentColor]=useState(intialColor);
    const handleColorClick=(color)=>{
        if(currentColor===color) return;
        setCurrentColor(color);
    }
  return (
    <section className="colors-facet  py-2">
    <div className="color-wrapper d-flex align-items-baseline">
      {colorFilters.length > 0 &&
      colorFilters.map((color) => {
        return <div className={`${currentColor===color?"clr-active-btn":""} product-colr-btn`} key={color} onClick={()=>{handleColorClick(color)}} style={{backgroundColor:color}}>
            {currentColor===color && <BsCheck className='text-white tick-icon' />}
        </div>
      })}
    </div>
    
  </section>
  )
}

export default ProductColors