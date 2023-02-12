import React, { useEffect, useState } from "react";
import { getFormattedPrice } from "../../helpers/helpers";
function ProductFacets({ products }) {
  const categoryFilters = [
    ...new Set(["All", ...products.map((product) => product.category)]),
  ];
  const colorFilters = [
    ...new Set([...products.flatMap((product) => product.colors)]),
  ];
  const companyFilters = [
    ...new Set(["All", ...products.map((product) => product.company)]),
  ];
  const maxPrice=Math.max(...products.map(product=>product.price))
  const [displayPrice,setDisplayPrice] = useState(0);
  const updatePriceFilter=(e)=>{
    const newDisplayPrice=e.target.value;
    setDisplayPrice(newDisplayPrice);
  }
  useEffect(()=>{
    setDisplayPrice(maxPrice);
  },[maxPrice])
  const displayPriceLabel=getFormattedPrice(displayPrice);
  return (
    <section className="product-facets">
      <form>
        <div className="form-group">
          <input type="text" placeholder="search.." className="form-control bg-light" />
        </div>
      </form>
      <section className="category-facet mb-2 mt-4">
        <h4>Category</h4>
        {categoryFilters.length > 0 &&
          categoryFilters.map((category) => {
            return <div className="mb-2 text-capitalize" key={category} >{category}</div>;
          })}
      </section>
      <section className="colors-facet  py-2">
        <h4 className="mb-2">Company</h4>
        <select>
        {companyFilters.length > 0 &&
          companyFilters.map((company) => {
            return <option className="text-lowercase" key={company} value={company}>{company}</option>;
          })}
        </select>
      </section>
      <section className="colors-facet  py-2">
        <h4>Colors</h4>
        <div className="color-wrapper d-flex align-items-baseline">
          <div className="me-2 color-static-label">All</div>
          {colorFilters.length > 0 &&
          colorFilters.map((color) => {
            return <div className=" product-colr-btn" key={color} style={{backgroundColor:color}}></div>;
          })}
        </div>
        
      </section>
        <section className="price-filter">
        <h4>Price</h4>
        <div className="mb-2 text-custom__primary fw-bolder">{displayPriceLabel}</div>
        <input type="range" max={maxPrice} min={0} value={displayPrice} onChange={updatePriceFilter} />
        </section>
      <section className="free-shipping-section mb-2 mt-3">
        <div className="form-check ps-0">
        <label className="form-check-label " htmlFor="flexCheckDefault">
           Free Shipping
          </label>
          <input
            className="form-check-input ms-3 float-none"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          
        </div>
      </section>
      <section className="clear-filters mt-4 mb-4">
        <button className="btn btn-danger btn-block btn-sm">
          Clear Filters
        </button>
      </section>
    </section>
  );
}

export default ProductFacets;
