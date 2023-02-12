import React from 'react'
import { getFormattedPrice } from '../../helpers/helpers'
function ProductDetailedView({product}) {
    const formPrice=getFormattedPrice(product.price)
  return (
   <div className="container-fluid mb-3">
        <div className="row">
            <div className="col-md-4">
                <img src={product.image} alt={product.name}  className="img img-fluid"/>
            </div>
            <div className="col-md-6 pt-2">
                <h5 className='mb-2 text-capitalize '>{product.name}</h5>
                <div className='text-custom__primary fw-bolder mb-2'>{formPrice}</div>
                <p className="text-muted">
                    {product.description.slice(0,98)}...
                </p>
                <button className="btn btn-sm btn-custom__primary">Details</button>
            </div>
        </div>
   </div>
  )
}

export default ProductDetailedView