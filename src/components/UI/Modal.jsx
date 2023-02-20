import React from 'react'
import "./Modal.css"
import ReactDOM from 'react-dom';
import {TiTick} from "react-icons/ti"
import { getFormattedPrice } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom';
function ModalWrapper({onClose,modalContent}) {
 const navigate=useNavigate();
 const cartNavigate=()=>{
    navigate("/cart");
 }
  return (
    <div className="modal d-block atc-modal" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-header">
                        <h4 className='pt-2' >Added to Cart <TiTick className='modal-check-icon' /></h4>
                        <button className="btn btn-outline-light" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body ">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {modalContent && <div>
                                    <h5 className='text-capitalize pb-1'>{modalContent.title}</h5>
                                   <img src={modalContent.image} alt="furniture" height={150} width={225} />
                                  
                                </div>}
                            </div>
                            <div className="col-md-6 ps-md-4 pt-3">
                                {modalContent && <div className='mt-2 mb-2'>
                                <div className='mt-2 text-muted'>Quantity: <span className='text-white'> {modalContent.quantity}</span></div>
                                    <div className="text-muted">Color: <span style={{backgroundColor:modalContent.color}} className="modal-cart-item__color"></span></div>
                                 <div className="text-muted">Cost:
                                 <span className='text-custom__primary ms-3'>{getFormattedPrice(modalContent.cost)}</span>
                                 </div>   
                                </div>}
                                <button className="btn w-100 text-white btn-info btn-block mb-2" onClick={cartNavigate}>Go to Cart</button>
                                <button className="btn w-100 btn-custom__primary btn-block mb-2" onClick={onClose}>Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

const Modal=(props)=>{
    return (
        ReactDOM.createPortal(<ModalWrapper {...props} />,document.getElementById("modal-wrapper"))
    )
}

export default Modal