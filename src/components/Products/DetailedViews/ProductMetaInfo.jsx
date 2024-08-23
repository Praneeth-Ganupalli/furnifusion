import React from "react";
import ProductColors from "./ProductColors";
import ProductQtyContainer from "./ProductQtyContainer";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store";
import AtcModal from "../../Cart/AtcModal";
import { useSelector } from "react-redux";
import useCart from "../../Cart/hooks/useCart";
import ButtonLoader from "../../UI/ButtonLoader";
function ProductMetaInfo({ product }) {
  const dispatch = useDispatch();
  const { company, sku: id, stock } = product;
  const stockMessage = stock > 0 ? "In Stock" : "Out of Stock";
  const { isLoggedIn } = useSelector((state) => state.auth);
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
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const [showAtcModal, setAtcModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [qty, setQty] = React.useState(1);
  const colorChangeHandler = React.useCallback((color) => {
    setSelectedColor(color);
  }, []);
  const qtyChangeHandler = React.useCallback((quantity) => {
    setQty(quantity);
  }, []);
  const { addItemToCart, isLoading, error } = useCart();
  const atcHandler = async () => {
    let newCartItem = {
      _id: product.sku + "_" + selectedColor,
      quantity: qty,
      color: selectedColor,
      cost: product.price * qty,
      image: product.images[0].url,
      title: product.name,
      price: product.price,
      brand: product.company,
      sku:product.sku,
      max:stock
    };
    if (isLoggedIn) {
      const response = await addItemToCart({
        sku: product.sku,
        color: selectedColor,
        quantity: qty,
      });
      newCartItem = response;
    }
    const cartContent = {
      ...newCartItem,
      cost:newCartItem.price * newCartItem.quantity,
      description: product.description,
      stars: Math.round(product.stars),
      customerRatings: product.reviews,
    };
    dispatch(cartActions.setCartItem(newCartItem));
    setModalContent(cartContent);
    setAtcModal(true);
    window.scrollTo(0, 0);
    setSelectedColor(product.colors[0]);
    setQty(1);
  };
  const closeModalHandler = () => {
    setAtcModal(false);
  };
  return (
    <section className="product-meta-wrapper">
      {metaDefInfo.map((met) => {
        return (
          <div className="row" key={met.label}>
            <div className={`col-md-3  meta-item ${met.class}`}>
              <h6 className="fw-bolder">{met.label}</h6>
            </div>
            <div className="col-md-3">
              <p className="text-capitalize">{met.text}</p>
            </div>
          </div>
        );
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
          <ProductColors
            colorFilters={product.colors}
            intialColor={selectedColor}
            onColorChange={colorChangeHandler}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 ps-3 pt-3">
         {stock>0 && <ProductQtyContainer
            onQtyChange={qtyChangeHandler}
            intialQuantity={qty}
            totalQty={stock}
          />}
          <section className="atc-wrapper mt-3">
            {error && <p className="text-danger my-2 py-2">{error}</p>}
            {
              stock>0 ? <ButtonLoader
              text="Add to Cart"
              clickCb={atcHandler}
              isLoading={isLoading}
              disabled={true}
              className="btn btn-block  btn-info text-white"
            /> :<button className="btn btn-block  btn-info disabled">{stockMessage}</button>
            }
          </section>
        </div>
      </div>
      {showAtcModal && (
        <AtcModal onClose={closeModalHandler} modalContent={modalContent} />
      )}
    </section>
  );
}

export default ProductMetaInfo;
