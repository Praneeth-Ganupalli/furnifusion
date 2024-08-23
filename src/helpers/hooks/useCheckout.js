import { useState } from "react"
import { getSavedInfo, clearAndNavigateToLogin } from "../auth";
import { CHECKOUT_URL, STRIPE_CANCEL_URL, STRIPE_SUCCESS_URL } from "../constants";
import axios from "axios";
const useCheckout = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const savedInfo = getSavedInfo();
    if (!savedInfo?.token) {
        return clearAndNavigateToLogin();
    }
    const fetchCheckoutSessionFromServer = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(CHECKOUT_URL, {
                success_url: STRIPE_SUCCESS_URL,
                cancel_url: STRIPE_CANCEL_URL,
            }, {
                headers: {
                    Authorization: `Bearer ${savedInfo.token}`
                }
            })
            const sessionId = response.data?.data;
            return sessionId;
        }
        catch (e) {
            setIsLoading(false);
            if (e.response?.status === 401) {
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
    }
    return {
        isLoading,
        error,
        fetchCheckoutSessionFromServer
    }
}

export default useCheckout