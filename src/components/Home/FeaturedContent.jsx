import React from 'react'
import products from "../../assets/featuredProducts.json";
import { useNavigate } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
function FeaturedContent() {
  const navigate=useNavigate();
  const browseBtnClick=()=>{
    navigate("/products");
  }
  return (
    <div className="container mt-3 p-5">
    <h2 className="text-center ">Featured Products</h2>
    <div className="underline"></div>
    <div className="mt-4 p-2 rounded">
      <div className="featured-card-container">
        {products.map((product) => {
          return (
            <div className="featured-card" key={product.id}>
             <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
    <div className="mt-3 text-center">
    <button type="button" className="btn btn-lg btn-custom__primary" onClick={browseBtnClick}>
          Browse Products
    </button>
    </div>
  </div>
  )
}

export default FeaturedContent