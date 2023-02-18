import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function BreadCrumb() {
  const breadcrumbData=useSelector(state=>state.breadcrumb?.data);
  return (
    <>
    <div className="p-5 site-breadcrumb">
      {breadcrumbData && breadcrumbData.length>0 && breadcrumbData.map(bdc=>{
        return <Fragment key={bdc.name}>
          {bdc.active && <span className='active-page text-capitalize' key={bdc.name}>{bdc.name}</span> }
          {!bdc.active && <span className='redirect-class'><Link to={bdc.path} className='text-white  text-decoration-none' key={bdc.name}>{bdc.name}</Link></span>}
        </Fragment>
      })
   } </div>
    </>
    
  ) 
}
export default BreadCrumb