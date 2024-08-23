import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import { lazy, useEffect, Suspense, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProductsAction, loginActions } from './store';
import { getSavedInfo } from './helpers/auth';
import useCart from './components/Cart/hooks/useCart';
import { cartActions } from './store';
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const Products = lazy(() => import("./pages/Products"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ProductDetailedPage = lazy(() => import("./pages/ProductDetailedPage"));
const ForgotPassword = lazy(()=>import('./pages/ForgotPassword'));
const OrderConfirmation = lazy(()=>import('./pages/OrderConfirmation'));
const OrderHistory = lazy(()=>import('./pages/OrderHistory'));
const OrderDetails = lazy(()=>import('./pages/OrderDetails'));
function App() {
  const dispatch = useDispatch();
  const [isFetchedOnceFromServer,setFetchedFromServer] = useState(false);
  const {isLoggedIn} = useSelector(state=>state.auth);
  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch])
  const userCart=useSelector(({cart})=>cart.list);
  const cartLength = userCart.length;
  const {getCartItems} = useCart();

  useEffect(() => {
    (async function(){
      if (cartLength === 0 && isLoggedIn && !isFetchedOnceFromServer) {
        const cartItems = await getCartItems();
        setFetchedFromServer(true);
        if(cartItems?.length)
        {
          cartItems.forEach(cartItem=>{
            cartItem.cost = cartItem.quantity * cartItem.price
          })
          localStorage.setItem('cart',JSON.stringify(cartItems));
          dispatch(cartActions.setSavedCart(cartItems));
        }
      }
      // else{
      //   const localCartItems = JSON.parse(localStorage.getItem('cart'));
      //   if(localCartItems)
      //   {
      //     localCartItems.forEach(cartItem=>{
      //       cartItem.cost = cartItem.quantity * cartItem.price
      //     })
      //     dispatch(cartActions.setSavedCart(localCartItems));
      //   }
      // }
    })()
  }, [dispatch,cartLength,isLoggedIn,getCartItems,isFetchedOnceFromServer])
  useEffect(()=>{
    if(!isLoggedIn)
    {
      const localCartItems = JSON.parse(localStorage.getItem('cart'));
      if(localCartItems)
      {
        localCartItems.forEach(cartItem=>{
          cartItem.cost = cartItem.quantity * cartItem.price
        })
        dispatch(cartActions.setSavedCart(localCartItems));
      }
    }

  },[dispatch,isLoggedIn])
  useEffect(()=>{
    if(userCart.length)
    {
      localStorage.setItem("cart",JSON.stringify(userCart))
    }
    else{
     localStorage.removeItem("cart");
    }
   },[userCart])
  useEffect(() => {
    const savedInfo = getSavedInfo();
    if (savedInfo) {
      dispatch(loginActions.setLoginStatus(true));
      dispatch(loginActions.setUserInfo(savedInfo));
    }
  }, [dispatch])
  return (
    <>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Suspense fallback={<p>Loading...</p>}><Home /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<p>Loading...</p>}><About /></Suspense>} />
            <Route path='/products' element={<Suspense fallback={<p>Loading...</p>}><Products /></Suspense>} />
            <Route path='/cart' element={<Suspense fallback={<p>Loading...</p>}><Cart /></Suspense>} />
            <Route path='/login' element={<Suspense fallback={<p>Loading...</p>}><Login /></Suspense>} />
            <Route path="/forgotPass" element={<Suspense fallback={<p>Loading...</p>}><ForgotPassword /></Suspense>} />
            <Route path='/products/:pid' element={<Suspense fallback={<p>Loading...</p>}><ProductDetailedPage /></Suspense>} />
            <Route path='/orderConfirmation' element={<Suspense fallback={<p>Loading...</p>}><OrderConfirmation /></Suspense>} />
            <Route path='/orders' element={<Suspense fallback={<p>Loading...</p>}><OrderHistory /></Suspense>} />
            <Route path='/orders/:orderId' element={<Suspense fallback={<p>Loading...</p>}><OrderDetails /></Suspense>} />
            <Route path="*" element={<Navigate to="/products"></Navigate> }></Route>
          </Routes>
        </AppLayout>

      </BrowserRouter>
    </>
  );
}

export default App;
