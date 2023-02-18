import React from 'react'
// import staticProd from "../../../assets/staticPro.json"
import { Link } from 'react-router-dom';
import ProductImageContainer from './ProductImageContainer';
import ProductDescription from './ProductDescription';
import "./pdp.css"
function PdpMain({product}) {
  // const product=staticProd;
  return (
    <section className="p-md-5 pdp-main___section">
      <section className="back-section mb-3 ps-md-3 mx-md-5">
        <Link to="/products">
          <button className="btn btn-block w-100 text-white">
            Back to products
          </button>
        </Link>
      </section>
      <div className="container">
        <div className="row">
            <div className="col-md-5">
                <ProductImageContainer images={product.images} />
            </div>
            <div className="col-md-7">
                <ProductDescription product={product} />
            </div>
        </div>
      </div>
    </section>
  ); 
}

export default PdpMain