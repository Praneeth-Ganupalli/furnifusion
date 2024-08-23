import React from 'react'
import { getFormattedPrice } from '../../helpers/helpers';
const OrderItem = ({product}) => {
    return (
        <li>
          <div className="card rounded-3 mb-4">
            <div className="card-body p-2 cart-item__container">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-md-2 col-lg-2 col-xl-2">
                  <img
                    src={product.image}
                    className="img-fluid rounded-3 mb-2 order-item__image"
                    alt={product.title}
                  />
                </div>
                <div className="col-md-3 col-lg-3 col-xl-3">
                  <p className="lead fw-normal mb-2 text-capitalize">
                    {product.title}
                  </p>
                  <div>
                    <div className="text-muted text-capitalize">
                      Brand: {product.brand}
                    </div>
                    <div className="text-muted">
                      Color:{" "}
                      <span
                        style={{ backgroundColor: product.color }}
                        className="order-item__color"
                      ></span>
                    </div>
                    <div className="text-capitalize cart-item__price">
                      Price: {getFormattedPrice(product.price)}
                    </div>
                  </div>
                </div>
                <div
                  className={`col-md-3 col-lg-3 col-xl-2 d-flex fw-bold`}
                >
                 <p>Quantity:{product.quantity}</p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 className="mb-0 text-custom__primary fw-bolder">
                    {getFormattedPrice(product.quantity * product.price)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
}

export default OrderItem