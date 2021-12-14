import React, { useState, useEffect } from "react";
import Home from "./Home";
import Product from "./Product";
import Register from "./Register";
import Cart from "./Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailProduct from "./DetailProduct";
import { getCart, checkToken } from "./Axios";
function App() {
  // tiendung
  // tiendung12345
  const [cart, setcart] = useState(0);
  useEffect(() => {
    let token = localStorage.getItem("accessToken");
    if (token) {
      try {
        checkToken().then((res) => {
          if (res.data.message === "Token is valid") {
            getCart().then((res) => {
              console.log(res.data.cart.items.length);
              setcart(res.data.cart.items.length);
            });
          }
        });
      } catch (error) {}
    }
  }, []);

  const cartAdd = () => {
    getCart().then((res) => {
      setcart(res.data.cart.items.length);
    });
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
        <Route path="/cart" element={<Cart soluong={cart} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
