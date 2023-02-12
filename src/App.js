import './App.css';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProductsAction } from './store';
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllProductsAction());
  },[dispatch])
  return (
   <>
   <BrowserRouter>
   <AppLayout>
    <Routes>
      <Route path="/" element={<Navigate to="/home"/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path='/products' element={<Products />} />
    </Routes>
   </AppLayout>
   
   </BrowserRouter>
   </>
  );
}

export default App;
