import React from 'react'
import ProductsList from '../components/Products/ProductsList'
import { useSelector } from 'react-redux'
import ProductFacets from '../components/Products/ProductFacets';
function Products() {
    const loadedProducts = useSelector(state => state.products.list);
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