import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/product-slice";
import { getAllProductsAction } from "./actions/product-actions";
const store=configureStore({
    reducer:{
        products:productSlice.reducer
    }
})
export {getAllProductsAction}
export default store;