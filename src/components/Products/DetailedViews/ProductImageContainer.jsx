import React, { useState } from 'react'

function ProductImageContainer({images}) {
 const [mainImageIndex,setMainImageIndex]=useState(0);
 const mainPoster=images[mainImageIndex]?.url;
  return (
   <section className="posters-container">
        <img src={mainPoster} alt="furniture"  className="pdp-main-poster"/>
    <section className="posters-list-wrapper mt-4">
        {images && images.length>0 && images.map((img,index)=>{
            return <div className={`poster-item ${img.url===mainPoster ? "active":""}`} key={index} onClick={()=>{
                setMainImageIndex(index)
            }}>
                <img src={img.url} alt="furniture" />
            </div>
        })}
    </section>
   </section>
  )
}

export default ProductImageContainer