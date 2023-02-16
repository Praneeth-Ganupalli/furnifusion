import React from 'react'
import { useParams } from 'react-router-dom'
import PdpMain from '../components/Products/DetailedViews/PdpMain';
function ProductDetailedPage() {
    const params=useParams();
  return (
    <>
    <div className='d-none'>Welcome to {params.pid}</div>
        <PdpMain />
    </>
    
  )
}

export default ProductDetailedPage