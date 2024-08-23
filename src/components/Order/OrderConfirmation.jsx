import React, { Fragment, useEffect, useState } from "react";
import CheckOutConfirmationModal from "../Checkout/CheckoutConfirmationModal";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";
import useOrders from "../../helpers/hooks/useOrders";
const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { isLoading, error, validatePayment } = useOrders();
  useEffect(() => {
    (async function () {
      try {
        const isPaymentSuccessFul = await validatePayment();
        if (isPaymentSuccessFul) {
          setShowConfirmationModal(true);
        }
      } catch (e) {
        if (e.message === 'Required Info Missing') {
            return navigate('/products');
        }
        else{
            setTimeout(() => {
                navigate("/products");
              }, 10000);
        }
      }
    })();
  }, [navigate,validatePayment]);
  return (
    <Fragment>
      {isLoading && <Loader />}
      {error && <p className="mt-2 py-2 text-danger">{error}</p>}
      {showConfirmationModal && (
        <CheckOutConfirmationModal
          onClose={() => {
            navigate("/products");
          }}
        />
      )}
    </Fragment>
  );
};

export default OrderConfirmation;
