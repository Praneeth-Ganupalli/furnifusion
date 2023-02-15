import React,{useEffect, useState} from "react";
import { useDispatch} from "react-redux";
import { productActions } from "../../../store";
function CategoryFacets({ categoryFilters,intialValue }) {
    const dispatch=useDispatch();
    const storedCatValue=intialValue || "All"
    const [currentFilter,setCurrentFilter]=useState("");
    const handleCategoryFilter=(category)=>{
        if(category===currentFilter) return;
        dispatch(productActions.applyFilters({
          type:"category",
          keyword:category
        }))
        setCurrentFilter(category);
      }
      useEffect(()=>{
        if(storedCatValue==="All")
        {
            setCurrentFilter("All")
        }
      },[storedCatValue])
  return (
    <section className="category-facet mb-2 mt-4">
      <h4>Category</h4>
      {categoryFilters.length > 0 &&
        categoryFilters.map((category) => {
          return (
            <div
              className={`mb-2 text-capitalize cursor-pointer ${currentFilter===category?"facet-active":""} `}
              key={category}
              onClick={() => {
                handleCategoryFilter(category);
              }}
            >
              {category}
            </div>
          );
        })}
    </section>
  );
}

export default CategoryFacets;
