import React from 'react'
import "./ImageCard.css"
function ImageCard({imgSrc}) {
  return (
    <div className='image-wrapper'>
    
    <img src={imgSrc} className="img img__card" alt="furiniture" />
    </div>
   
  )
}

export default ImageCard