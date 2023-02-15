import { createSlice} from "@reduxjs/toolkit";
const initialState={
    list:[],
    displayedList:[],
    filtersList:{
        search:'',
        category:"",
        company:"",
        price:"",
        color:"",
        shipping:""
    }
};
const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        setProducts(state,action)

        {
            state.list=action.payload;
            state.displayedList=action.payload;
        },
        applyFilters(state,action)
        {
            const filter=action.payload;
            state.filtersList[filter.type]=filter.keyword==="All"?"":filter.keyword;
            const {search,category,company,color,price,shipping}=state.filtersList;
            let tempProducts=[...state.list];
            if(search)
            {
                tempProducts=tempProducts.filter(temP=>temP.name.toLowerCase().startsWith(search.toLowerCase()))
            }
            if(category)
            {
                tempProducts=tempProducts.filter(temP=>temP.category===category)
            }
            if(company)
            {
                tempProducts=tempProducts.filter(temP=>temP.company===company)
            }
            if(color)
            {
                tempProducts=tempProducts.filter(temP=>temP.colors.includes(color))
            }
            if(shipping)
            {
                tempProducts=tempProducts.filter(temp=>temp.shipping)
            }
            if(price)
            {
                tempProducts=tempProducts.filter(temP=>temP.price<=price)
            }
            state.displayedList=tempProducts;
        },
        resetFilters(state,_)
        {
            state.displayedList=state.list;
            state.filtersList= {
                text:'',
                category:"",
                company:"",
                price:"",
                color:"",
                shipping:""
            }
        },
        sortResults(state,action)
        {
            const sortType=action.payload;
            if(sortType==="A-Z")
            {
                state.displayedList=state.displayedList.sort((a,b)=>a.name.localeCompare(b.name));
            }
            if(sortType==="Z-A")
            {
                state.displayedList=state.displayedList.sort((a,b)=>b.name.localeCompare(a.name));
            }
            if(sortType==="0-9")
            {
                state.displayedList=state.displayedList.sort((a,b)=>a.price-b.price);
            }
            if(sortType==="9-0")
            {
                state.displayedList=state.displayedList.sort((a,b)=>b.price-a.price);
            }
            if(sortType==="rel")
            {
                const currentDisplayNames=state.displayedList.map(li=>li.name);
                state.displayedList=state.list.filter(list=>currentDisplayNames.includes(list.name))
            }
        }
    }
})
export const productActions= productSlice.actions;
export default productSlice