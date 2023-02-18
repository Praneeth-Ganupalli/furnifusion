import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PdpMain from '../components/Products/DetailedViews/PdpMain';
import { single_product_url } from '../helpers/constants';
import axios from 'axios';
import Loader from '../components/UI/Loader';
import { useDispatch } from 'react-redux';
import { breadCrumbActions } from '../store';
function ProductDetailedPage() {
  const {pid}=useParams();
  const [product,setProduct]=useState(null);
  const [isLoading,setLoading] =useState(false);
  const [isError,setError] =useState(false);
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${single_product_url}${pid}`);
        const { data } = response;
        setProduct(data);
        setLoading(false);
        dispatch(breadCrumbActions.updateBreadcrumbs([
          {
            name: "Products",
            path: "/products"
          },
          {
            name: data.name,
            active: true
          }
        ]))
      }
      catch(err) {
        setLoading(false);
        setError(true);
      }
    }
    fetchData();
  },[pid,dispatch])
  return (
    <>
     {isLoading && <Loader /> }
     {!isLoading && product && <PdpMain product={product} />}
     {isError && <div className='p-5 mt-5 d-flex justify-content-center align-item-center text-danger h-erro-100'>Sorry Unable to Fetch product Data</div>}
    </>
    
  )
}

export default ProductDetailedPage