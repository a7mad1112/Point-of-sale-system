import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  CartType,
  CartsType,
  Product,
  Products as ProductsType,
} from "../types/types";
import SectionHeading from "../pages/Components/SectionHeading/SectionHeading";
import Loader from "../pages/Components/Loader/Loader";
const LazyMeasures = React.lazy(() => import("../pages/Measure/Measure"));
const LazyProducts = React.lazy(() => import("../pages/Products/Products"));
const LazyProductPage = React.lazy(() => import("../pages/Product/Product"));
const LazyHome = React.lazy(() => import("../pages/Home/Home"));
const LazyCart = React.lazy(() => import("../pages/Cart/Cart"));
const LazyCategories = React.lazy(
  () => import("../pages/Categories/Categories")
);

export const Routers = () => {
  const location = useLocation();
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const products: ProductsType = useSelector(
    (state: any) => state.products.products
  );
  // function to use in helmet for title
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/cart":
        return "Cart";
      case "/categories":
        return "Categories";
      case "/measures":
        return "Measure";
      case "/products":
        return "Products";
      case `/cart/${location.pathname.split("/")[2]}`: {
        // we need to find cart name
        // access id of cart
        const cartId: number = +location.pathname.split("/")[2];
        const foundCart = (carts || []) as any[];
        const cart = foundCart.find((cart) => cart.id === cartId);
        return cart ? cart.attributes.name : "Not Found";
      }
      case `/products/${location.pathname.split("/")[2]}`: {
        const productId: number = +location.pathname.split("/")[2];
        const foundProduct = (carts || []) as any[];
        const prod = foundProduct.find((prod) => prod.id === productId);
        return prod ? prod.attributes.name : "Not Found";
      }
      default:
        return "Not Found";
    }
  };

  // if the id valid then show productPage, otherwise return to Products Page
  const ValidProductPage = () => {
    const { id } = useParams();
    const productId = Number(id);

    const isValidProduct = (productId: number) => {
      const foundProduct: Product | undefined = (
        (products || []) as Product[]
      ).find((product: Product) => product.id === productId);
      return !!foundProduct;
    };

    if (!isValidProduct(productId)) {
      return <Navigate to="/products" replace />;
    }

    return (
      <React.Suspense>
        <LazyProductPage />
      </React.Suspense>
    );
  };

  // component return cart page if id exist, otherwise go back
  const ValidCartPage = () => {
    const { id } = useParams();
    const cartId = Number(id);

    const isValidCart = (cartId: number) => {
      const foundCart: CartType | undefined = (
        (carts || []) as CartType[]
      ).find((cart: CartType) => cart.id === cartId);
      return foundCart;
    };

    if (!isValidCart(cartId)) {
      return <Navigate to="/" replace />;
    }

    return (
      <React.Suspense>
        <LazyCart />
      </React.Suspense>
    );
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getTitle()}</title>
      </Helmet>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense>
              <LazyHome />
            </React.Suspense>
          }
        />
        <Route path="/cart/:id" element={<ValidCartPage />} />
        <Route
          path="/categories"
          element={
            <React.Suspense>
              <LazyCategories />
            </React.Suspense>
          }
        />
        <Route
          path="/measures"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyMeasures />
            </React.Suspense>
          }
        />
        <Route
          path="/products"
          element={
            <React.Suspense>
              <LazyProducts />
            </React.Suspense>
          }
        />
        <Route path="/products/:id" element={<ValidProductPage />} />
        <Route
          path="*"
          element={<SectionHeading position="center" text="404 Not Found" />}
        />
      </Routes>
    </HelmetProvider>
  );
};
