import React from 'react'
import {AiOutlineStar,AiFillStar} from "react-icons/ai";
function Ratings({customerRatings,productRating}) {
   const maxRating=5;
   const unFilledStars=maxRating-productRating;
   const filledStarsArr=Array.from(Array(productRating).keys());
   const unfilledStarsArr=Array.from(Array(unFilledStars).keys());
  return (
    <div className="ratings-class">
        {filledStarsArr.length>0 && filledStarsArr.map((_,index)=><span key={index}><AiFillStar className='text-warning' /></span>)}
        {unfilledStarsArr.length>0 && unfilledStarsArr.map((_,index)=><span key={index}><AiOutlineStar className='text-warning' /></span>)}   
    <span className='static'>({customerRatings})</span>
    </div>
  )
}

export default Ratings