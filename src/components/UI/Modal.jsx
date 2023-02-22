import React from 'react'
import "./Modal.css"
import ReactDOM from 'react-dom';
import {TiTick} from "react-icons/ti"
function ModalWrapper({onClose,children,title}) {
  return (
    <div className="modal d-block atc-modal" onClick={onClose}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-light text-black" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-header">
                        <h4 className='pt-2' >{title} <TiTick className='modal-check-icon' /></h4>
                        <button className="btn btn-dark" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body ">
                   {children}
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