import React, { useState } from 'react'
import ProductCard from './ProductCard'
import "./Products.css"
import ProductHeader from './ProductHeader'
import ProductDetailedView from './ProductDetailedView'
function ProductsList({products}) {
  const [isListView,setListView]=useState(true);
  const changeProductsView=(val)=>{
    if(val===isListView) return;
    setListView(val);
  }
  return (
    <>
      <ProductHeader text={`${products.length} products found`} onViewChange={changeProductsView} isListView={isListView} />
      {isListView && <div className="products-landing-wrapper d-flex flex-wrap">
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
      </div>}
      {
        !isListView && <div className='products-landing-wrapper grid-view'>
            {products &&
          products.length > 0 &&
          products.map((product) => {
            return <ProductDetailedView product={product} key={product.id} />;
          })}
        </div>
      }
    </>
  );
}

export default ProductsList