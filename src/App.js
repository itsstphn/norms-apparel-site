import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";

import { useAuthContext } from "./hooks/useAuthContext";
import CreateListing from "./pages/admin/CreateListing";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Cart from "./pages/cart/Cart";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import { fetchCart } from "./store/cartSlice";

import { fetchProducts } from "./store/productsSlice";

function App() {
  const { user, authIsReady } = useAuthContext();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="App">
      {authIsReady ? (
        <BrowserRouter>
          <Navbar></Navbar>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/product/:id" element={<Product></Product>}></Route>
              <Route
                path="/signup"
                element={
                  user ? <Navigate to="/"></Navigate> : <Signup></Signup>
                }
              ></Route>
              <Route
                path="/signin"
                element={
                  user ? <Navigate to="/"></Navigate> : <Signin></Signin>
                }
              ></Route>
              <Route path="/cart" element={<Cart></Cart>}></Route>
              <Route
                path="/create-listing"
                element={<CreateListing></CreateListing>}
              ></Route>
            </Routes>
          </div>
        </BrowserRouter>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
