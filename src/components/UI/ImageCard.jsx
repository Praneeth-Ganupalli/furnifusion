import React from 'react'
import "./ImageCard.css"
import {BiSearch} from "react-icons/bi"
import { Link } from 'react-router-dom'
function ImageCard({imgSrc,pid}) {
 const redirectUrl=`/products/${pid} `
  return (
    <div className='image-wrapper'>
    <img src={imgSrc} className="img img__card" alt="furiniture" />
    <div className='details-icon'><Link to={redirectUrl} className="text-white"> <BiSearch /> </Link></div>
    </div>
   
  )
}

export default ImageCard