import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Categories from "../pages/Categories/Categories";
import Measure from "../pages/Measure/Measure";
import Products from "../pages/Products/Products";
export const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart/:id" element={<Cart />} />
      <Route path="categories/" element={<Categories />} />
      <Route path="/measure" element={<Measure />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
};
