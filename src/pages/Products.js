import React, { useEffect } from 'react'
import ProductsList from '../components/Products/ProductsList'
import { useSelector,useDispatch } from 'react-redux'
import ProductFacets from '../components/Products/ProductFacets';
import { productActions } from '../store';
function Products() {
    const loadedProducts = useSelector(state => state.products.displayedList);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(productActions.resetFilters());
    },[dispatch])
    return (
        <section className='product-page-content mt-5 p-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-2'>
                        <ProductFacets products={loadedProducts} />
                    </div>
                    <div className='col-md-9'>
                        <ProductsList products={loadedProducts} />
                    </div>
                </div>
            </div>

        </section>

    )
}

export default Products