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
export const products_url = 'https://course-api.com/react-store-products'

export const single_product_url = `https://course-api.com/react-store-single-product?id=`
export const TEST_CARD="5111111111111111"