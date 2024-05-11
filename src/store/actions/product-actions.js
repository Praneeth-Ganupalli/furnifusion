import { productActions } from "../slices/product-slice"
import { products_url } from "../../helpers/constants";
import axios from "axios";
export const getAllProductsAction = () => {
    return async (dispatch) => {
        const response = await axios.get(products_url);
        const { data } = response;
        if (data) {
            const productsData = [];
            for (const key in data) {
                productsData.push(data[key]);
            }
            if (productsData.length) {
                console.log(productsData);
                dispatch(productActions.setProducts(productsData));
            }
        }

    }
}