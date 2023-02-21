import { configureStore } from "@reduxjs/toolkit";
import productSlice,{productActions} from "./slices/product-slice";
import { getAllProductsAction } from "./actions/product-actions";
import { breadCrumbSlice,breadCrumbActions } from "./slices/breadcrum-slice";
import { cartSlice,cartActions } from "./slices/cart-slice";
import { loginActions,loginSlice } from "./slices/login-slice";
const store=configureStore({
    reducer:{
        products:productSlice.reducer,
        breadcrumb:breadCrumbSlice.reducer,
        cart:cartSlice.reducer,
        login:loginSlice.reducer
    }
})
export {getAllProductsAction,productActions,breadCrumbActions,cartActions,loginActions}
export default store;