import React,{useEffect,useState} from 'react'
import Modal from '../UI/Modal'
function CheckOutConfirmationModal({onClose}) {
    const [closeCount,setCloseCount]=useState(5);
    useEffect(()=>{
       const redirectCounter= setInterval(()=>{
            setCloseCount(prevCount=>prevCount-1);
        },[1000]);
        const removeTimeout=()=>{
            clearInterval(redirectCounter)
        }
        return removeTimeout;
    },[setCloseCount,closeCount])
  return (
    <Modal title="Order Placed" onClose={onClose}>
        <p className="lead text-justify">
            Your Order Has been Placed SuccessFully.Thanks For shopping with us.Visit Again.
            You will be redirected To Home in {closeCount} seconds automatically.or upon closing this popup
        </p>
    </Modal>
  )
}

export default CheckOutConfirmationModal