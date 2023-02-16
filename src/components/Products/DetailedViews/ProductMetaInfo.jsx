import React from "react";
import ProductColors from "./ProductColors";
import ProductQtyContainer from "./ProductQtyContainer";
function ProductMetaInfo({ product }) {
  const { company, id, stock } = product;
  const stockMessage = stock > 0 ? "In Stock" : "Out of Stock";
  const metaDefInfo = [
    {
      label: "Availability:",
      class: `availability__info`,
      text: stockMessage,
    },
    {
      label: "SKU:",
      class: `sku__info`,
      text: id,
    },
    {
      label: "Brand:",
      class: `brand__info`,
      text: company,
    },
  ];
  return (
    <section className="product-meta-wrapper">
    {metaDefInfo.map(met=>{
        return <div className="row" key={met.label}>
        <div className={`col-md-3  meta-item ${met.class}`}>
          <h6 className="fw-bolder">{met.label}</h6>
        </div>
        <div className="col-md-3">
          <p className="text-capitalize">{met.text}</p>
        </div>
      </div>
    })}
    <div className="row">
       <div className="col-md-6">
        <hr className="hr" />
       </div>
    </div>
    <div className="row">
        <div className="col-md-3 mt-2">
            <h6 className="fw-bolder">Colors:</h6>
        </div>
        <div className="col-md-3 pdp-color-wrapper">
            <ProductColors colorFilters={product.colors} intialColor={product.colors[0]}  />
        </div>
    </div>
    <div className="row">
        <div className="col-md-6 ps-3 pt-3">
            <ProductQtyContainer />
            <section className="atc-wrapper mt-3">
                <button className="btn btn-block  btn-info text-white">
                    Add to Cart
                </button>
            </section>
        </div>
    </div>
    </section>
  );
}

export default ProductMetaInfo;
