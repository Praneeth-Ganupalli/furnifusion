import React, { useState } from 'react'
import "./Checkout.css"
import {IoArrowBack} from "react-icons/io5"
import {AiFillCreditCard} from "react-icons/ai"
import { TEST_CARD } from '../../helpers/constants'
import CheckOutConfirmationModal from './CheckoutConfirmationModal'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { cartActions } from '../../store'
const formatInputNumber=(e)=>{
    const re = /^[0-9\b]+$/;
    const currentValue=e.target.value.replaceAll(" ","").replaceAll("/","");
    if (currentValue === '' || re.test(currentValue)) {
       return true;
    }
}
const validateExpDate=(value)=>{
    if(!value) return false;
    if(value.length>=5)
    {
        const curDate=new Date();
        const month=curDate.getMonth()+1;
        const year=curDate.getFullYear()%2000;
        const [inputMonth,inputYear]=value.split("/");
        if(parseInt(inputMonth)<=12  && parseInt(inputYear)>=year)
        {
            if(parseInt(inputMonth)<=12 && parseInt(inputMonth)===month && parseInt(inputYear)===year)
        {
            return false;
        }
          return true;
        }
    }
    else{
        return null;
    }
}
function CheckoutForm({onSummaryShow}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [cardNumber,setCardNmber]=useState("");
  const [exp,setExp]=useState("");
  const [cvv,setCvv]=useState('');
  const [cardHolder,setCardHolder]=useState("");
  const [nameError,setNameError]=useState(false);
  const [cardNumError,setCardNumError]=useState(false);
  const [expError,setExpError]=useState(false);
  const [cvvError,setCvvError]=useState(false);
  const [showConfirMationModal,setcnfModal]=useState(false);
  const [showLoader,setShowLoader]=useState(false);
  const ccNumberInputHandler = (e) => {
    if (formatInputNumber(e)) {
      const inputVal=e.target.value;
      if(inputVal.length<20)
      {
        setCardNmber(e.target.value);
      }
      if(cardNumError && inputVal.length)
      {
        setCardNumError(false);
      }
    }
  };
  const formatCC = () => {
    const v = cardNumber
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
    const formattedCc = parts.length > 1 ? parts.join(" ") : cardNumber;
    setCardNmber(formattedCc);
    if(!formattedCc)
    {
        setCardNumError(true);
    }
  };
  const expInputHandler = (e) => {
    if (formatInputNumber(e)) {
      let inputVal = e.target.value.replace("/", "");
      let formattedVal = inputVal;
      if (inputVal.length > 2) {
        const formattedMonth=inputVal.substr(0, 2)
        formattedVal = `${formattedMonth}/${inputVal.slice(2)}`;
      }
      if (formattedVal.length <= 5) {
        setExp(formattedVal);
      }
      if(expError && formattedVal.length && validateExpDate(formattedVal) )
      {
        setExpError(false);
      }
    }
  };
  const cvvInputHandler=(e)=>{
    if(formatInputNumber(e))
    {
        const inputVal=e.target.value;
        if(inputVal.length<4)
        {
            setCvv(inputVal);
        }
        if(cvvError && inputVal.length>=3)
        {
            setCvvError(false);
        }
    }
  }
  const cardHolderInputHandler=(e)=>{
    setCardHolder(e.target.value);
    if(nameError && e.target.value)
    {
        setNameError(false);
    }
  }
  const cardNameBlurHandler=()=>{
    if(!cardHolder)
    {
        setNameError(true);
    }
  }
  const expBlurHandler=()=>{
    const validExp=validateExpDate(exp);
    console.log(validExp);
    if(validExp!==null)
    {
        setExpError(!validExp);
    }
  };
  const cvvBlurHandler=()=>{
    if(!cvv)
    {
        setCvvError(true);
    }
  }
  const placeOrderClick=(e)=>{
    e.preventDefault();
    const inputErrors=[nameError,cardNumError,expError,cvvError].filter(Boolean);
    let errors=[];
    if(inputErrors.length){
        errors.push("inputerr");
    }
    if(!cvv || cvv.length<3){
        errors.push("cvv");
        setCvvError(true);
    }
    if(!exp || exp.length<5)
    {
        errors.push("exp");
        setExpError(true);
    }
    if(!cardHolder)
    {
        errors.push("cardHolder");
        setNameError(true);
    }
    if(!cardNumber)
    {
        errors.push("number");
        setCardNumError(true);
    }
    if(errors.length) return;
    if(cardNumber.replaceAll(" ","")!==TEST_CARD)
    {
        setCardNumError(true);
        return;
    }
    setShowLoader(true);
    setTimeout(()=>{
      setcnfModal(true);
      setShowLoader(false);
      setTimeout(completePlaceOrder,5000);
    },2000)
   
  }
  function completePlaceOrder()
  {
    setcnfModal(false);
    dispatch(cartActions.clearCart());
    navigate("/home");
  }
  return (
    <section className="card">
      <div className="card-body">
        <header className="d-flex">
          <h3 className="cursor-pointer" onClick={onSummaryShow}>
            <IoArrowBack />
          </h3>
          <h3 className="text-center m-auto">Checkout</h3>
        </header>
        <section className="payment-form mt-2">
          <form onSubmit={placeOrderClick}>
            <div className="form-group mb-2">
              <label htmlFor="Name">Cardholder Name</label>
              <input
                type="text"
                className={`form-control mt-2 ${
                  nameError ? "error-input-container" : ""
                }`}
                placeholder="John Doe"
                value={cardHolder}
                onChange={cardHolderInputHandler}
                onBlur={cardNameBlurHandler}
              />
              {nameError && (
                <p className="text-danger error-text">Name is Mandatory</p>
              )}
            </div>
            <div className="form-group mb-2 relative">
              <label htmlFor="number">Card Number</label>
              <input
                type="text"
                className={`form-control mt-2 ${
                  cardNumError ? "error-input-container" : ""
                }`}
                placeholder="XXXX XXXX XXXX XXXX"
                value={cardNumber}
                onChange={ccNumberInputHandler}
                onBlur={formatCC}
              />
              <div className="cc-icon">
                <AiFillCreditCard />
              </div>
              {cardNumError && (
                <p className="text-danger error-text">Provide Valid Number</p>
              )}
              <div className="text-muted mt-2 mb-2 card-hint">
                Test Card: 5111 1111 1111 1111
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group mb-2">
                  <label htmlFor="exp">Expiry Date</label>
                  <input
                    type="text"
                    className={`form-control mt-2 ${
                      expError ? "error-input-container" : ""
                    }`}
                    placeholder="mm / yy"
                    value={exp}
                    onChange={expInputHandler}
                    onBlur={expBlurHandler}
                  />
                  {expError && (
                    <p className="text-danger error-text">
                      Please Provide Valid Exp
                    </p>
                  )}
                </div>
              </div>
              <div className="col-3">
                <div className="form-group mb-2">
                  <label htmlFor="Name">CVV</label>
                  <input
                    type="text"
                    className={`form-control mt-2 ${
                      cvvError ? "error-input-container" : ""
                    }`}
                    placeholder="***"
                    value={cvv}
                    onChange={cvvInputHandler}
                    onBlur={cvvBlurHandler}
                  />
                  {cvvError && (
                    <p className="text-danger error-text">Cvv is Mandatory</p>
                  )}
                </div>
              </div>
            </div>
            {!showLoader && (
              <button className="btn btn-info btn-block w-100 mt-2 mb-0 text-white">
                Place Order
              </button>
            )}
            {showLoader && (
              <button
                className="btn btn-info btn-block w-100 mt-2 mb-0 text-white"
                type="button"
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Placing Order...
              </button>
            )}
          </form>
        </section>
      </div>
      {showConfirMationModal && (
        <CheckOutConfirmationModal onClose={completePlaceOrder} />
      )}
    </section>
  );
}

export default CheckoutForm