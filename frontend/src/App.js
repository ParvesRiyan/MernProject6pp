import React, { useEffect, useState } from 'react'
import './App.css';
import { Routes, Route, } from 'react-router-dom';
import webfont from "webfontloader";
import Header from "./Component/Layout/Header/Header.js";
import Footer from "./Component/Layout/Footer/Footer";
import Home from "./Component/Home/Home.js"
import ProductDetails from './Component/Product/ProductDetails.js';
import Products from "./Component/Product/Products.js";
import Search from "./Component/Product/Search.js";
import LoginSignup from './Component/User/LoginSignup';
import store from "./Store";
import { loadUser } from './Actions/userAction';
import UserOptions from "./Component/Layout/Header/UserOptions.js";
import { useSelector } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import Profile from "./Component/User/Profile.js";
import axios from 'axios';
import ProtectedRoute from './Component/Route/ProtectedRoute';
import UpdateProfile from "./Component/User/UpdateProfile.js";
import UpdatePassword from "./Component/User/UpdatePassword.js";
import ForgotPassword from "./Component/User/ForgotPassword.js";
import ResetPassword from "./Component/User/ResetPassword.js"
import Cart from "./Component/Cart/Cart.js"
import Shipping from "./Component/Cart/Shipping.js";
import ConfirmOrder from "./Component/Cart/ConfirmOrder.js";
import OrderSuccess from "./Component/Cart/OrderSuccess.js";
import MyOrders from "./Component/Order/MyOrders.js";
import OrderDetails from "./Component/Order/OrderDetails.js";
import Payment from "./Component/Cart/Payment.js";
import Dashboard from "./Component/Admin/Dashboard.js";
import ProductList from "./Component/Admin/ProductList.js";
import NewProduct from './Component/Admin/NewProduct';
import UpdateProduct from './Component/Admin/UpdateProduct.js';
import OrderList from './Component/Admin/OrderList.js';
import ProcessOrder from './Component/Admin/ProcessOrder.js';
import UsersList from './Component/Admin/UsersList.js';
import UpdateUser from './Component/Admin/UpdateUser.js';
import ProductReviews from './Component/Admin/ProductReviews.js';
import Contact from "./Component/Layout/Contact/Contact.js";
import About from "./Component/Layout/About/About.js";
import NotFound from "./Component/Layout/Not Found/NotFound.js";



function App() {

  const { isAuthenticated, user } = useSelector(state => state.user)

  const [stripeApiKey, setStripeApiKey] = useState("")

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")

    setStripeApiKey(data.stripeApiKey);
  }


  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid-Sans", "Chilanka"]
      }
    });


    store.dispatch(loadUser())

    getStripeApiKey();

  }, [])

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/product/:id' element={<ProductDetails />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/products/:keyword' element={<Products />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/account' element={isAuthenticated ? <Profile /> : <LoginSignup />} />
          <Route exact path='/me/update' element={isAuthenticated ? <UpdateProfile /> : <LoginSignup />} />
          <Route exact path='/password/update' element={isAuthenticated ? <UpdatePassword /> : <LoginSignup />} />
          <Route exact path='/password/forgot' element={<ForgotPassword />} />
          <Route exact path='/password/reset/:token' element={<ResetPassword />} />
          <Route exact path='/login' element={<LoginSignup />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/login/shipping' element={isAuthenticated ? <Shipping /> : <LoginSignup />} />
          <Route exact path='/order/confirm' element={isAuthenticated ? <ConfirmOrder /> : <LoginSignup />} />

          <Route exact path='/process/payment' element={isAuthenticated ? stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>) : <LoginSignup />} />

          <Route exact path='/success' element={isAuthenticated ? <OrderSuccess /> : <LoginSignup />} />
          <Route exact path='/orders' element={isAuthenticated ? <MyOrders /> : <LoginSignup />} />
          <Route exact path='/order/:id' element={isAuthenticated ? <OrderDetails /> : <LoginSignup />} />

          {/* //admin route will start from hear */}
          <Route isAdmin={true} exact path='/admin/dashboard' element={(<ProtectedRoute><Dashboard /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/products' element={(<ProtectedRoute><ProductList /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/product' element={(<ProtectedRoute><NewProduct /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/product/:id' element={(<ProtectedRoute><UpdateProduct /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/orders' element={(<ProtectedRoute><OrderList /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/order/:id' element={(<ProtectedRoute><ProcessOrder /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/users' element={(<ProtectedRoute><UsersList /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/user/:id' element={(<ProtectedRoute><UpdateUser /></ProtectedRoute>)} />
          <Route isAdmin={true} exact path='/admin/reviews' element={(<ProtectedRoute><ProductReviews /></ProtectedRoute>)} />

          {/* Admin route will end  */}

          <Route
          element={
            window.location.pathname === "/process/payment" ? null : <NotFound />
          }
        />

        </Routes>

      <Footer />

    </>
  );
}

export default App;
