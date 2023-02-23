import React from "react";
import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import { getFormattedPrice } from "../../helpers/helpers";
function AtcModal({ modalContent, onClose }) {
  const navigate = useNavigate();
  const cartNavigate = () => {
    navigate("/cart");
  };
  return (
    <Modal title="Added To Cart" onClose={onClose}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {modalContent && (
              <div>
                <h5 className="text-capitalize pb-1">{modalContent.title}</h5>
                <img
                  src={modalContent.image}
                  alt="furniture"
                  height={150}
                  width={225}
                />
              </div>
            )}
          </div>
          <div className="col-md-6 ps-md-4 pt-3">
            {modalContent && (
              <div className="mt-2 mb-2">
                <div className="mt-2 text-muted">
                  Quantity:{" "}
                  <span className="text-black"> {modalContent.quantity}</span>
                </div>
                <div className="text-muted">
                  Color:{" "}
                  <span
                    style={{ backgroundColor: modalContent.color }}
                    className="modal-cart-item__color"
                  ></span>
                </div>
                <div className="text-muted">
                  Cost:
                  <span className="text-custom__primary ms-3">
                    {getFormattedPrice(modalContent.cost)}
                  </span>
                </div>
              </div>
            )}
            <button
              className="btn w-100 text-white btn-info btn-block mb-2"
              onClick={cartNavigate}
            >
              Go to Cart
            </button>
            <button
              className="btn w-100 btn-custom__primary btn-block mb-2"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AtcModal;
