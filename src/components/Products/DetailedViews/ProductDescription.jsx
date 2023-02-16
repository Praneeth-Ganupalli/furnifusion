import React from 'react'
import { getFormattedPrice } from '../../../helpers/helpers'
import ProductMetaInfo from './ProductMetaInfo'
import Ratings from '../../UI/Ratings'
function ProductDescription({product}) {
 const displayPrice=getFormattedPrice(product.price)
  return (
    <section className="product-description__content">
        <h2 className='text-capitalize h1'>{product.name}</h2>
        <div className='product-ratings'><Ratings productRating={Math.round(product.stars)} customerRatings={product.reviews} /></div>
        <div className="text-custom__primary fw-bold mt-2 pdp-price">{displayPrice}</div>
        <p className="lead mt-2 text-secondary ">
            {product.description}
        </p>
        <section className='product-core__info'>
            <ProductMetaInfo product={product} />
        </section>
    </section>
  )
}

export default ProductDescription