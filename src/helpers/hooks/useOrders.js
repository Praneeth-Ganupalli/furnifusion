import axios from 'axios';
import { useState, useCallback } from 'react'
import { CHECKOUT_URL, ORDERS_URL } from '../constants';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store';
import { clearAndNavigateToLogin } from '../auth';
const useOrders = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const validatePayment = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(false);
            const sessionId = sessionStorage.getItem('checkoutSessionId');
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!sessionId || !userInfo.token) {
                throw new Error('Required Info Missing');
            }
            const response = await axios.get(`${CHECKOUT_URL}/validatePayment/${sessionId}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            })
            if (response.data.status === 'success') {
                localStorage.removeItem('cart');
                dispatch(cartActions.clearCart());
                return true;
            }
            else {
                throw new Error('Unable to validate payment');
            }
        }
        catch (e) {
            const message = e.response?.data?.message || e.message
            setError(message);
            throw e;
        }
        finally {
            setIsLoading(false);

            sessionStorage.removeItem('checkoutSessionId');
        }
    }, [dispatch])
    const performAxiosAction = useCallback(async (url, method, payload) => {
        try {
            setIsLoading(true);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo?.token) {
                throw new Error("Not Logged In");
            }
            const response = await axios({
                method, url, data: payload, headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            });
            return response.data;
        }
        catch (e) {
            setIsLoading(false);
            if (e.response?.status === 401 || e.message === 'Not Logged In') {
                clearAndNavigateToLogin();
            }
            else {
                const message = e.response?.data?.message || e.message
                setError(message);
            }
            setTimeout(() => {
                setError(false);
            }, 5000)
        }
        finally {
            setIsLoading(false);
        }
    }, [])
    const fetchUserOrders = useCallback(async () => {
        const serverResponse = await performAxiosAction(ORDERS_URL, 'GET', null);
        return serverResponse.data;
    }, [performAxiosAction])
    const fetchOrderDetails = useCallback(async (orderId) => {
        const serverResponse = await performAxiosAction(`${ORDERS_URL}/${orderId}`, 'GET', null);
        return serverResponse.data;
    }, [performAxiosAction])
    return {
        isLoading,
        error,
        validatePayment,
        fetchUserOrders,
        fetchOrderDetails
    }
}

export default useOrders