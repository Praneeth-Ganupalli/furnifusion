import { productActions } from "../slices/product-slice"
import { products_url } from "../../helpers/constants";
import axios from "axios";
export const getAllProductsAction=()=>{
    return async (dispatch)=>{
        const response=await axios.get(products_url);
        const {data} = response;
        dispatch(productActions.setProducts(data));
    }
}