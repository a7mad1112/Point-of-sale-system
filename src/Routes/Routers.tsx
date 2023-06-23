import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Categories from "../pages/Categories/Categories";
import Measure from "../pages/Measure/Measure";
import Products from "../pages/Products/Products";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { measuresActions } from "../store/states/measuresSlice";
import Loader from "../pages/Components/Loader/Loader";
import { categoryActions } from "../store/states/categoriesSlice";
import { productsActions } from "../store/states/productsSlice";
export const Routers = () => {
  // fetch data[categories, measures, products]
  const dispatch = useDispatch();
  // fetch measures
  const MEASURES_URL = "http://localhost:1337/api/unit-of-measures1";
  const { response: measuresRes } = useFetch(MEASURES_URL);

  useEffect(() => {
    if (measuresRes.data) {
      dispatch(measuresActions.setMeasures(measuresRes.data.data));
    }
  }, [measuresRes, dispatch]);

  // fetch categories
  const { response: categoriesRes } = useFetch(
    "http://localhost:1337/api/categories1"
  );
  useEffect(() => {
    dispatch(categoryActions.setCategories(categoriesRes.data.data));
  }, [categoriesRes, dispatch]);

  // fetch products
  const { response: productsRes } = useFetch(
    "http://localhost:1337/api/products1?populate=*"
  );
  useEffect(() => {
    dispatch(productsActions.setProducts(productsRes.data.data));
  }, [productsRes, dispatch]);

  if (measuresRes.loading || categoriesRes.loading || productsRes.loading)
    return (
      <div className="loading-container">
        <Loader />
      </div>
    );
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
