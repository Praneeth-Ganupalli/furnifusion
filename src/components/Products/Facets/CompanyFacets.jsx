import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { productActions } from '../../../store';
function CompanyFacets({companyFilters,intialValue}) {
  const dispatch=useDispatch();
  const intLocValue=intialValue||"All"
  const [dropdownVal,setDropDownVal] = useState("");
  const handleCompanyFilter=(e)=>{
    if(dropdownVal===e.target.value) return;
    dispatch(productActions.applyFilters({
      type:"company",
      keyword:e.target.value
    }))
    setDropDownVal(e.target.value)
  }
  useEffect(()=>{
    if(intLocValue==="All")
    {
        setDropDownVal("All")
    }
  },[intLocValue])
  return (
    <section className="category-facet  py-2">
    <h4 className="mb-2">Company</h4>
    <select onChange={handleCompanyFilter} value={dropdownVal}>
    {companyFilters.length > 0 &&
      companyFilters.map((company) => {
        return <option className="text-lowercase" key={company}  value={company}>{company}</option>;
      })}
    </select>
  </section>
  )
}

export default CompanyFacets