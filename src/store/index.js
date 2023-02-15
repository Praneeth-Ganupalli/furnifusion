import { configureStore } from "@reduxjs/toolkit";
import productSlice,{productActions} from "./slices/product-slice";
import { getAllProductsAction } from "./actions/product-actions";
const store=configureStore({
    reducer:{
        products:productSlice.reducer
    }
})
export {getAllProductsAction,productActions}
export default store;