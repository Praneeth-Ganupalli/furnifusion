import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const NAV_LINKS=[
    {
        name:"Home",
        path:"/home"
    },
    {
        name:"About",
        path:"/about"
    },
    {
        name:"Products",
        path:"/products"
    }
]
export const HOME_PAGE_CARDS=[
    {
        name:"Mission",
        icon:<GiCompass className='text-success' />,
        content:"Furnifusion's mission is to make furniture shopping easy & enjoyable. Offering stylish, high-quality & affordable options for modern & traditional homes. Our goal is to help customers create the home of their dreams with ease."
    },
    {
        name:"Vision",
        icon:<GiDiamondHard className='text-success' />,
        content:"Furnifusion's vision is to be the top destination for furniture shopping, offering a diverse range of options for all styles & budgets. We aim to create an easy and user-friendly shopping experience, becoming the go-to source for all furniture needs."
    },
    {
        name:"History",
        icon:<GiStabbedNote className='text-success' />,
        content:"Furnifusion was founded to offer affordable, stylish furniture for all. Our journey started with a small selection and grew into a passion for creating functional homes.we strive for excellent customer service and a seamless shopping experience."
    }
]
const BASE_URL = 'https://furni-fusion-server-production.up.railway.app/api/v1'
//const BASE_URL=`http://127.0.0.1:8006/api/v1`;
export const products_url = `${BASE_URL}/products`
export const SIGN_UP_URL = `${BASE_URL}/users/signup`
export const LOGIN_URL= `${BASE_URL}/users/login`
export const CART_URL = `${BASE_URL}/cart`
export const CHECKOUT_URL = `${BASE_URL}/checkout`;
export const ORDERS_URL = `${BASE_URL}/orders`;
export const VERIFY_USER_EMAIL_URL=`${BASE_URL}/users/forgotPassword`;
export const VALIDATE_RESET_CODE_URL=`${BASE_URL}/users/verifyResetCode`;
export const RESET_PASSWORD_WITH_CODE_URL=`${BASE_URL}/users/resetUserPassword`;
export const single_product_url = `https://furni-fusion-praneeth836-default-rtdb.firebaseio.com/products`
export const TEST_CARD="4242 4242 4242 4242"
export const STRIPE_PUBLIC_KEY='pk_test_51PoKO2AcLL8Pk18MN0pjC9ELuBNfEIKzirR12bVfJ3wwfaJ6b9hZ76Nq9wL08vLvFjmUks9v92jgJW7HPR3YU0kY00hn55Om03';
export const STRIPE_SUCCESS_URL=`${window.location.origin}/orderConfirmation`;
export const STRIPE_CANCEL_URL=`${window.location.origin}/cart`;
