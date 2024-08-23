import { useCallback, useState } from 'react'
import { LOGIN_URL, SIGN_UP_URL, VERIFY_USER_EMAIL_URL, RESET_PASSWORD_WITH_CODE_URL, VALIDATE_RESET_CODE_URL } from '../constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { cartActions, loginActions } from '../../store';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { saveUserInfo } from '../auth';
import useCart from '../../components/Cart/hooks/useCart';
const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {syncLocalCart} = useCart();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleAuthAction = async (url, payload) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post(url, payload)
            if (response.data.status === "success") {
                const authResponse = response.data.data;
                dispatch(loginActions.setLoginStatus(true));
                dispatch(loginActions.setUserInfo(authResponse));
                saveUserInfo(authResponse);
                const mergedCart = await syncLocalCart(authResponse.token);
                if(mergedCart?.length)
                {
                    mergedCart.forEach(item=>item.cost = item.quantity * item.price);
                    dispatch(cartActions.setSavedCart(mergedCart));
                }
                if (searchParams.get('fromCart')) {
                    navigate('/cart')
                }
                else {
                    navigate("/home");
                }
            }
        }
        catch (e) {
            const message = e.response?.data?.message || e.message
            setError(message);
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleAxiosRequest = async (url, payload, method) => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await axios({ url: url, data: payload, method })
            return response.data
        }
        catch (e) {
            const message = e.response?.data?.message || e.message
            setError(message);
        }
        finally {
            setIsLoading(false);
        }
    }
    const findUserByEmail = useCallback(async (email) => {
        try {
            return await handleAxiosRequest(VERIFY_USER_EMAIL_URL, { email }, "POST");
        }
        catch (e) {
            throw e;
        }
    }, [])
    const verifyResetCode = useCallback(async (email, code) => {
        try {
            return await handleAxiosRequest(VALIDATE_RESET_CODE_URL, { email, resetCode: code }, "POST");
        }
        catch (e) {
            throw e;
        }
    },[])
    const resetUserPassword = useCallback(async (email, code, pass) => {
        try {
            return await handleAxiosRequest(RESET_PASSWORD_WITH_CODE_URL, { email, resetCode: code, newPassword: pass }, "POST");
        }
        catch (e) {
            throw e;
        }
    },[])
    const createAccount = async (name, email, pass) => {
        try {
            await handleAuthAction(SIGN_UP_URL, {
                name,
                email,
                password: pass,
                passwordConfirm: pass
            })
        }
        catch (e) {
            console.error("error while creating account", e.message);
        }
    }
    const loginWithCredentials = async (email, pass) => {
        try {
            handleAuthAction(LOGIN_URL, {
                email,
                password: pass
            })
        }
        catch (e) {
            console.error("Error while loggin in", e.message)
        }
    }
    return {
        error,
        createAccount,
        isLoading,
        loginWithCredentials,
        findUserByEmail,
        verifyResetCode,
        resetUserPassword
    }
}

export default useAuth