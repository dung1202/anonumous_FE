// import React, { useState, useEffect } from "react";
import Home from "./Home";
import Product from "./Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailProduct from "./DetailProduct";
// import jwt_decode from 'jwt-decode'
function App() {
  

  // const loginSuccess = (token) => {
  //   setToken(token);
  //   localStorage.setItem("accessToken", token);
  // };

  // useEffect(() => {
  //   let token = localStorage.getItem("accessToken");
  //   // if (token) {
  //   //   try {
  //   //     const userID = jwt_decode(token)._id;
  //   //     getUserByID(userID).then((res) => {
  //   //       const user = res.data;
  //   //       setUserName(user.name);
  //   //       setToken(token);
  //   //     });
  //   //   } catch (error) {
  //   //     setToken("");
  //   //   }
  //   // }
  // }, [token]); setToken={loginSuccess}
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/" element={<Product />} />
        <Route path="detail-product/" element={<DetailProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
