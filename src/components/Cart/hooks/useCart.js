import { useState,useCallback } from 'react'
import { getSavedInfo } from '../../../helpers/auth';
import axios from 'axios';
import { CART_URL } from '../../../helpers/constants';
import { clearAndNavigateToLogin } from '../../../helpers/auth';
const useCart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const performCartAction = useCallback(async (url, data, method) => {
        const userInfo = getSavedInfo();
        if(!userInfo?.token){
         return  clearAndNavigateToLogin();
        }
        try{
            setIsLoading(true);
            setError(false);
            const response = await axios({url,method,data,headers:{
                'Authorization':`Bearer ${userInfo.token}`
            }})
            return response.data;
        }
        catch(e)
        {
           if(e.response?.status === 401)
           {
             clearAndNavigateToLogin();
           }
           else{
            const message = e.response?.data?.message || e.message
            setError(message);
           }
            
        }
        finally{
            setIsLoading(false);
            setTimeout(()=>{
                setError(false);
            },5000)
        }
    },[])
    const addItemToCart = async (data) => {
        const dataFromServer = await performCartAction(CART_URL,data,'POST');
        return dataFromServer.data;
    }
    const getCartItems = useCallback(async()=>{
        const dataFromServer = await performCartAction(CART_URL,null,'GET');
        return dataFromServer.data;
    },[performCartAction])
    const removeItemFromCart = async (itemId) => {
        await performCartAction(`${CART_URL}/${itemId}`,null,'DELETE')
    }
    const syncLocalCart = async () => {
        const localCartItems = JSON.parse(localStorage.getItem('cart'));
       const finalCart =  await performCartAction(CART_URL,{localCartItems},"PUT");
       return finalCart.data;
    }
    const updateQuantity = useCallback(async(id,action)=>{
        await performCartAction(`${CART_URL}/${id}`,{action},'PUT')
    },[performCartAction])
    const clearCart = async()=>{
        await performCartAction(CART_URL,null,"DELETE");
    }
    return {
        isLoading,
        error,
        addItemToCart,
        removeItemFromCart,
        syncLocalCart,
        clearCart,
        updateQuantity,
        getCartItems
    }
}

export default useCart