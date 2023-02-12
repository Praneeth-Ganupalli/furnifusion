import React from 'react'
import ProductCard from './ProductCard'
import "./Products.css"
import ProductHeader from './ProductHeader'
function ProductsList({products}) {
  return (
    <>
    <ProductHeader text={`${products.length} products found`} />
        <div className='products-landing-wrapper d-flex flex-wrap'>
   {products && products.length>0 && products.map(product=>{
        return <ProductCard product={product} key={product.id}/>
    })}
   </div>
    </>
   
  )
}

export default ProductsList