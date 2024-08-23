import { productActions } from "../slices/product-slice"
import { products_url } from "../../helpers/constants";
import axios from "axios";
export const getAllProductsAction = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(products_url);
            const responseData = response.data;
            if (responseData?.data) {
                const productsData = [];
                for (const key in responseData?.data) {
                    responseData.data[key].id = responseData.data[key].sku
                    productsData.push(responseData.data[key]);
                }
                if (productsData.length) {
                    dispatch(productActions.setProducts(productsData));
                }
            }
        }
        catch (e) {
            console.log('error fetching productss', e);
        }
    }


}