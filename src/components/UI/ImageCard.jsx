import React from 'react'
import "./ImageCard.css"
import {BiSearch} from "react-icons/bi"
function ImageCard({imgSrc}) {
  return (
    <div className='image-wrapper'>
    <img src={imgSrc} className="img img__card" alt="furiniture" />
    <div className='details-icon'> <BiSearch /> </div>
    </div>
   
  )
}

export default ImageCard