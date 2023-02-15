import React,{ useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { productActions } from '../../../store';
import { getFormattedPrice } from '../../../helpers/helpers';
function PriceFacet({products,intialValue}) {
    const dispatch=useDispatch();
    const maxPrice=Math.max(...products.map(product=>product.price))
    const intLocPrice=intialValue||maxPrice;
    const [displayPrice,setDisplayPrice] = useState(0);
    useEffect(()=>{
        if(intLocPrice===maxPrice)
        {
            setDisplayPrice(maxPrice);
        }
    },[maxPrice,intLocPrice])
    const updatePriceFilter=(e)=>{
      const newDisplayPrice=e.target.value;
      setDisplayPrice(newDisplayPrice);
      dispatch(productActions.applyFilters({
        type:"price",
        keyword:newDisplayPrice
      }))
    }
    const displayPriceLabel=getFormattedPrice(displayPrice);
    
  return (
    <section className="price-filter mt-2">
      <h4>Price</h4>
      <div className="mb-2 text-custom__primary fw-bolder">
        {displayPriceLabel}
      </div>
      <input
        type="range"
        max={maxPrice}
        min={0}
        value={displayPrice}
        onChange={updatePriceFilter}
      />
    </section>
  );
}

export default PriceFacet