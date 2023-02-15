import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store";
import CompanyFacets from "./Facets/CompanyFacets";
import CategoryFacets from "./Facets/CategoryFacets";
import ColorsFacets from "./Facets/ColorsFacets";
import PriceFacet from "./Facets/PriceFacet";
import ShippingFacet from "./Facets/ShippingFacet";
function ProductFacets() {
  const products = useSelector((state) => state.products.list);
  const facets=useSelector(state=>state.products.filtersList);
  const categoryFilters = [
    ...new Set(["All", ...products.map((product) => product.category)]),
  ];
  const colorFilters = [
    ...new Set([...products.flatMap((product) => product.colors)]),
  ];
  const companyFilters = [
    ...new Set(["All", ...products.map((product) => product.company)]),
  ];
  const dispatch = useDispatch();
  const handleResetBtnClick = () => {
    dispatch(productActions.resetFilters());
  };
  const handleSearch=(e)=>{
    dispatch(productActions.applyFilters({
      type:"search",
      keyword:e.target.value
    }))
  }
  return (
    <section className="product-facets">
      <form onSubmit={(e)=>e.preventDefault()}>
        <div className="form-group">
          <input
            type="text"
            placeholder="search.."
            className="form-control bg-light"
            onChange={handleSearch}
          />
        </div>
      </form>
      <>
        <CategoryFacets categoryFilters={categoryFilters} intialValue={facets.category} />
      </>
      <>
        <CompanyFacets companyFilters={companyFilters} intialValue={facets.company} />
      </>
      <>
        <ColorsFacets colorFilters={colorFilters} intialColor={facets.color} />
      </>
      <>
        <PriceFacet products={products} intialValue={facets.price}/>
      </>
      <>
        <ShippingFacet intialValue={facets.shipping} />
      </>
      <section className="clear-filters mt-4 mb-4">
        <button
          className="btn btn-danger btn-block btn-sm"
          onClick={handleResetBtnClick}
        >
          Clear Filters
        </button>
      </section>
    </section>
  );
}

export default ProductFacets;
