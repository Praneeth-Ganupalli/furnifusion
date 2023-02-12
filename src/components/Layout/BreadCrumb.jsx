import React from 'react'
import { Link } from 'react-router-dom'
function BreadCrumb({activePath}) {
  return (
    <div className="p-5 site-breadcrumb">
        <span><Link to="/home" className='text-white text-decoration-none'>Home</Link></span>
        <span>/</span>
        <span className='active-page text-capitalize'>{activePath}</span>
    </div>
  ) 
}

export default BreadCrumb