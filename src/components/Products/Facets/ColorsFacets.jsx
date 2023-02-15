import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { productActions } from '../../../store';
import {BsCheck} from "react-icons/bs"
function ColorsFacets({colorFilters,intialColor}) {
    const intClr=intialColor || "All";
    const [currentColor,setCurrentColor]=useState("");
    const dispatch=useDispatch();
    const handleColorClick=(color)=>{
        if(currentColor===color) return;
        dispatch(productActions.applyFilters({
            type:"color",
            keyword:color
        }))
        setCurrentColor(color);
    }
    useEffect(()=>{
        if(intClr=="All")
        {
            setCurrentColor("All")
        }
    },[intClr])
  return (
    <section className="colors-facet  py-2">
    <h4>Colors</h4>
    <div className="color-wrapper d-flex align-items-baseline">
      <div className={`me-2 color-static-label cursor-pointer ${currentColor==="All"?"facet-active":"op-3"}`} onClick={()=>handleColorClick("All")}>All</div>
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

export default ColorsFacets