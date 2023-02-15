import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFillGridFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { productActions } from "../../store";
function ProductHeader({ text,onViewChange,isListView }) {
  const dispatch=useDispatch();
  const [sortValue,setSortValue]=React.useState("rel");
  const handleSortChange=(e)=>{
    dispatch(productActions.sortResults(e.target.value));
    setSortValue(e.target.value)
  }
  return (
    <header className="product-page-header mb-3">
      <div className="d-flex ">
        <span className={`me-2 icon-change-view ${isListView?"active":""}`} onClick={()=>{onViewChange(true)}}>
          <BsFillGridFill />
        </span>
        <span className={`icon-change-view ${!isListView?"active":""}`} onClick={()=>{onViewChange(false)}}>
          <RxHamburgerMenu />
        </span>
      </div>
      <div className="mx-md-3">{text}</div>
      <div className="w-50">
        <hr className="hr"></hr>
      </div>
      <div className="ms-auto d-flex align-items-center product-end-info">
        <div className="me-1">Sort By</div>
        <div className="header-dropdown">
          <select onChange={handleSortChange} value={sortValue}>
          <option value="rel">Relevance(Popular)</option>
            <option value="0-9">Price(Low-highest)</option>
            <option value="9-0">Price(Highest-Low)</option>
            <option value="A-Z">Name(A-Z)</option>
            <option value="Z-A">Name(Z-A)</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default ProductHeader;
