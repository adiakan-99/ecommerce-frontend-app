import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Products from './Products';
import Home from './Home';
import Navbar from './Navbar';
import ProductDetails from './ProductDetails';
import Signup from './Signup';
import Signin from './Signin';
import { useSelector } from "react-redux"
import ProtectedRoutes from './ProtectedRoutes';
import Wishlist from './Wishlist';
import Cart from './Cart';
import SelectAddress from './SelectAddress';
import FinalCheckOut from './FinalCheckOut';
import OrderHistory from './OrderHistory';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import AddressForm from './AddressForm';

function App() {
  const isLoggedIn = useSelector((result) => result.user.isLoggedIn)
  const [totalCost, setTotalCost] = React.useState(0)
  const navbarNotVisible = ["/change/user/email", "/change/user/password"];
  const [isShowNavbar, setIsShowNavbar] = React.useState(false);
  let currentPath = useLocation().pathname;

  React.useEffect(() => {
    if (!navbarNotVisible.includes(currentPath)) {
      setIsShowNavbar(true);
    }
  }, [currentPath])

  return (
    <>
      {
        isLoggedIn && isShowNavbar ?
        <Navbar />
        :
        null
      }
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products/:category' element={<Products />}></Route>
          <Route path='/productdetails/:id' element={<ProductDetails />}></Route>
          <Route path='/wishlist' element={<Wishlist />}></Route>
          <Route path='/cart' element={<Cart totalCost={totalCost} setTotalCost={setTotalCost} />}></Route>
          <Route path='/selectaddress' element={<SelectAddress />}></Route>
          <Route path='/checkout' element={<FinalCheckOut totalCost={totalCost} />}></Route>
          <Route path='/user/profile' element={<UserProfile />}></Route>
          <Route path='/orders' element={<OrderHistory />}></Route>
          <Route path='/change/user/password' element={<ChangePassword />}></Route>
          <Route path='/change/user/email' element={<ChangeEmail />}></Route>
          <Route path='/update/user/address' element={<AddressForm />}></Route>
        </Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
      </Routes>
    </>
  );
}

export default App;
