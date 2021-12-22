import React, { useState, useEffect } from "react";
import Home from "./Home";
import Product from "./Product";
import Register from "./Register";
import Cart from "./Cart";
import Proflie from "./Profile";
import DetailProduct from "./DetailProduct";
import Edituser from "./Edituser";
import CheckOut from "./CheckOut";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCart, checkToken } from "./Axios";
function App() {
  // tiendung
  // tiendung12345
  const [cart, setcart] = useState(0);
  const [checkOut, setcheckOut] = useState("");

  useEffect(() => {
    let Token = localStorage.getItem("accessToken");
    if (Token) {
      try {
        checkToken().then((res) => {
          if (res.data.message === "Token is valid") {
            getCart().then((res) => {
              setcart(res.data.cart.items.length);
            });
          }
        });
      } catch (error) {}
    }
  }, []);

  const logout = () => {
    setcart(0);
  };

  const cartAdd = () => {
    getCart().then((res) => {
      setcart(res.data.cart.items.length);
    });
  };

  const check = (add) => {
    setcheckOut(add);
    console.log(add);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home soluong={cart} them={cartAdd} />} />
        <Route
          path="/product"
          element={<Product soluong={cart} them={cartAdd} />}
        />
        <Route
          path="/detail-product/:id/"
          element={<DetailProduct soluong={cart} them={cartAdd} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart soluong={cart} them={cartAdd} out={check} />} />
        <Route
          path="/profile"
          element={<Proflie soluong={cart} dangxuat={logout} />}
        />
        <Route path="/edit" element={<Edituser soluong={cart} />} />
        <Route
          path="/checkout"
          element={<CheckOut soluong={cart} them={cartAdd} muaDo={checkOut} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
