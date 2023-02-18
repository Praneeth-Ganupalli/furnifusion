import './App.css';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetailedPage from './pages/ProductDetailedPage';
import Cart from './pages/Cart';
import { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllProductsAction,cartActions } from './store';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllProductsAction());
  },[dispatch])
  useEffect(()=>{
    const savedCart=sessionStorage.getItem("cart");
    if(savedCart)
    {
      dispatch(cartActions.setSavedCart(JSON.parse(savedCart)))
    }
  },[dispatch])
  const userCart=useSelector(({cart})=>cart.list);
  useEffect(()=>{
   if(userCart.length)
   {
     sessionStorage.setItem("cart",JSON.stringify(userCart))
   }
   else{
    sessionStorage.removeItem("cart");
   }
  },[userCart])
  return (
   <>
   <BrowserRouter>
   <AppLayout>
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path='/products' element={<Products />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/products/:pid' element={<ProductDetailedPage />} />
    </Routes>
   </AppLayout>
   
   </BrowserRouter>
   </>
  );
}

export default App;
