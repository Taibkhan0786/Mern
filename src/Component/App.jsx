import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import NavBar from "./NavBar";
import Footer from "./Footer";
import Home from "./Home";
import Contact from "./Contact";
import Shop from "./Shop";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Checkout from "./Checkout";
import AdminHome from "./Admin/AdminHome";

import AdminMaincategory from "./Admin/Maincategory/AdminMaincategory";
import AdminAddMaincategory from "./Admin/Maincategory/AdminAddMaincategory";
import AdminUpdateMaincategory from "./Admin/Maincategory/AdminUpdateMaincategory";

import AdminSubcategory from "./Admin/Subcategory/AdminSubcategory";
import AdminAddSubcategory from "./Admin/Subcategory/AdminAddSubcategory";
import AdminUpdateSubcategory from "./Admin/Subcategory/AdminUpdateSubcategory";

import AdminBrand from "./Admin/Brand/AdminBrand";
import AdminAddBrand from "./Admin/Brand/AdminAddBrand";
import AdminUpdateBrand from "./Admin/Brand/AdminUpdateBrand";

import AdminProduct from "./Admin/Product/AdminProduct";
import AdminAddProduct from "./Admin/Product/AdminAddProduct";
import AdminUpdateProduct from "./Admin/Product/AdminUpdateProduct";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import Confirmation from "./Confirmation";
import AdminUser from "./Admin/user/AdminUser";
import AdminNewslatter from "./Admin/newslatter/AdminNewslatter";
import AdminContact from "./Admin/contact/AdminContact";
import AdminSingleContact from "./Admin/contact/AdminSingleContact";
import AdminCheckout from "./Admin/checkout/AdminCheckout";
import AdminSingleCheckout from "./Admin/checkout/AdminSingleCheckout";
import ForgetPassword1 from "./ForgetPassword1";
import ForgetPassword2 from "./ForgetPassword2";
import ForgetPassword3 from "./ForgetPassword3";

import Payment from "./Payment"
function App(props) {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop/:mc/:sc/:br" element={<Shop />} />
          <Route path="/single-product/:_id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-password-1" element={<ForgetPassword1 />} />
          <Route path="/forget-password-2" element={<ForgetPassword2 />} />
          <Route path="/forget-password-3" element={<ForgetPassword3 />} />

          <Route path="/cart" element={localStorage.getItem("login")?<Cart />:<Login/>} />
          <Route path="/profile" element={localStorage.getItem("login")?<Profile />:<Login/>} />
          <Route path="/update-profile" element={localStorage.getItem("login")?<UpdateProfile />:<Login/>} />
          <Route path="/confirmation" element={localStorage.getItem("login")?<Confirmation />:<Login/>} />
          <Route path="/checkout" element={localStorage.getItem("login")?<Checkout />:<Login/>} />
          <Route path="/payment/:_id" element={localStorage.getItem("login")?<Payment />:<Login/>} />


          <Route path="/admin" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminHome /> : <Profile /> : <Login />} />

          <Route path="/admin-maincategory" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminMaincategory /> : <Profile /> : <Login />} />
          <Route path="/admin-add-maincategory" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminAddMaincategory /> : <Profile /> : <Login />} />
          <Route path="/admin-update-maincategory/:_id" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminUpdateMaincategory /> : <Profile /> : <Login />} />

          <Route path="/admin-subcategory" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminSubcategory /> : <Profile /> : <Login />} />
          <Route path="/admin-add-subcategory" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminAddSubcategory /> : <Profile /> : <Login />} />
          <Route path="/admin-update-subcategory/:_id" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminUpdateSubcategory /> : <Profile /> : <Login />} />

          <Route path="/admin-brand" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminBrand /> : <Profile /> : <Login />} />
          <Route path="/admin-add-brand" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminAddBrand /> : <Profile /> : <Login />} />
          <Route path="/admin-update-brand/:_id" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminUpdateBrand /> : <Profile /> : <Login />} />

          <Route path="/admin-product" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminProduct /> : <Profile /> : <Login />} />
          <Route path="/admin-add-product" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminAddProduct /> : <Profile /> : <Login />} />
          <Route path="/admin-update-product/:_id" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminUpdateProduct /> : <Profile /> : <Login />} />

          <Route path="/admin-user" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminUser /> : <Profile /> : <Login />} />
          <Route path="/admin-newslatter" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminNewslatter /> : <Profile /> : <Login />} />

          <Route path="/admin-contact" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminContact /> : <Profile /> : <Login />} />
          <Route path="/admin-single-contact/:_id" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminSingleContact /> : <Profile /> : <Login />} />

          <Route path="/admin-checkout" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminCheckout /> : <Profile /> : <Login />} />
          <Route path="/admin-single-checkout/:_id" element={localStorage.getItem("login") ? localStorage.getItem("role") === "Admin" ? <AdminSingleCheckout /> : <Profile /> : <Login />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
