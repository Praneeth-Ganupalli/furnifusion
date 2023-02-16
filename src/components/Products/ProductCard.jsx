import React from 'react'
import ImageCard from '../UI/ImageCard'
import { getFormattedPrice } from '../../helpers/helpers'
function ProductCard({product}) {
    const formattedPrice=getFormattedPrice(product.price)
    return (
     <div className='product-card'>
     <ImageCard imgSrc={product.image} pid={product.id} />
     <section className='d-flex mt-2 mb-2'>
      <div className='text-capitalize'>{product.name}</div>
      <div className='fw-bold ms-auto text-custom__primary'>{formattedPrice}</div>
     </section>
     </div>
    )
}

export default ProductCard