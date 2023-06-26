import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Categories from "../pages/Categories/Categories";
import Measure from "../pages/Measure/Measure";
import Products from "../pages/Products/Products";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Loader from "../pages/Components/Loader/Loader";
import { cartProductsActions } from "../store/states/cartProductsSlice";
import { cartsActions } from "../store/states/cartSlice";
import { productsActions } from "../store/states/productsSlice";
import { categoryActions } from "../store/states/categoriesSlice";
import { measuresActions } from "../store/states/measuresSlice";
import { CartsType } from "../types/types";
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

  // fetch carts
  const { response: cartsRes } = useFetch(
    "http://localhost:1337/api/carts1?populate=*"
  );
  useEffect(() => {
    // we don't need completed carts[checkout carts], so will filter them
    const allCarts: any = cartsRes.data.data;
    let filteredCarts = [];
    if (allCarts) {
      filteredCarts = allCarts.filter(
        (cart: any) => !cart.attributes.completed
      );
    }
    dispatch(cartsActions.setCarts(filteredCarts));
  }, [cartsRes, dispatch]);

  // fetch carts products
  const { response: cartProductsRes } = useFetch(
    "http://localhost:1337/api/carts-products1?pagination[limit]=-1&populate=*"
  );
  useEffect(() => {
    dispatch(cartProductsActions.setCartProducts(cartProductsRes.data.data));
  }, [cartProductsRes, dispatch]);

  const loading = [
    measuresRes.loading,
    categoriesRes.loading,
    productsRes.loading,
    cartsRes.loading,
    cartProductsRes.loading,
  ];
  if (loading.some((l) => l === true))
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
