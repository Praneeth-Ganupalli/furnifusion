import React from "react";
import ProductColors from "./ProductColors";
import ProductQtyContainer from "./ProductQtyContainer";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import AtcModal from "../../Cart/AtcModal"
function ProductMetaInfo({ product }) {
  const dispatch=useDispatch();
  const { company, id, stock } = product;
  const stockMessage = stock > 0 ? "In Stock" : "Selling Fast";
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
  const [selectedColor,setSelectedColor]=React.useState(product.colors[0]);
  const [showAtcModal,setAtcModal]=React.useState(false);
  const [modalContent,setModalContent]=React.useState(null);
  const [qty,setQty]=React.useState(1);
  const colorChangeHandler=React.useCallback((color)=>{
   setSelectedColor(color);
  },[])
  const qtyChangeHandler=React.useCallback((quantity)=>{
    setQty(quantity);
  },[])
  const atcHandler=()=>{
    const newCartItem={
      id:product.id+"_"+selectedColor,
      quantity:qty,
      color:selectedColor,
      cost:product.price*qty,
      image:product.images[0].url,
      title:product.name,
      price:product.price,
      brand:product.company
    }
    dispatch(cartActions.setCartItem(newCartItem));
    setModalContent(newCartItem);
    setAtcModal(true);
    setSelectedColor(product.colors[0]);
    setQty(1);
  }
  const closeModalHandler=()=>{
    setAtcModal(false);
  }
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
            <ProductColors colorFilters={product.colors} intialColor={selectedColor} onColorChange={colorChangeHandler}  />
        </div>
    </div>
    <div className="row">
        <div className="col-md-6 ps-3 pt-3">
            <ProductQtyContainer onQtyChange={qtyChangeHandler} intialQuantity={qty}/>
            <section className="atc-wrapper mt-3">
                <button className="btn btn-block  btn-info text-white" onClick={atcHandler}>
                    Add to Cart
                </button>
            </section>
        </div>
    </div>
    {showAtcModal && <AtcModal onClose={closeModalHandler} modalContent={modalContent} />}
    </section>
  );
}

export default ProductMetaInfo;
