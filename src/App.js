import Home from "./Home";
import Product from "./Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailProduct from "./DetailProduct";
function App() {
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
