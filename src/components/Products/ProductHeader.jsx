import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFillGridFill } from "react-icons/bs";
function ProductHeader({ text,onViewChange,isListView }) {
  return (
    <header className="product-page-header mb-3">
      <div>
        <span className={`me-2 icon-change-view ${isListView?"active":""}`} onClick={()=>{onViewChange(true)}}>
          <BsFillGridFill />
        </span>
        <span className={`icon-change-view ${!isListView?"active":""}`} onClick={()=>{onViewChange(false)}}>
          <RxHamburgerMenu />
        </span>
      </div>
      <div>{text}</div>
      <div className="w-50">
        <hr className="hr"></hr>
      </div>
      <div className="ms-auto d-flex align-items-center product-end-info">
        <div className="me-1">Sort By</div>
        <div className="header-dropdown">
          <select>
            <option value="a">Price(Low-highest)</option>
            <option value="a">Price(Highest-Low)</option>
            <option value="a">Name(A-Z)</option>
            <option value="a">Name(Z-A)</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default ProductHeader;
