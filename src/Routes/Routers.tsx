import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Categories from "../pages/Categories/Categories";
import Measure from "../pages/Measure/Measure";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../pages/Components/Loader/Loader";
import { cartProductsActions } from "../store/states/cartProductsSlice";
import { cartsActions } from "../store/states/cartSlice";
import { productsActions } from "../store/states/productsSlice";
import { categoryActions } from "../store/states/categoriesSlice";
import { measuresActions } from "../store/states/measuresSlice";
import ProductPage from "../pages/Product/Product";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  CartType,
  CartsType,
  Product,
  Products as ProductsType,
} from "../types/types";
import Products from "../pages/Products/Products";
import SectionHeading from "../pages/Components/SectionHeading/SectionHeading";
export const Routers = () => {
  // fetch data[categories, measures, products]
  const dispatch = useDispatch();
  // fetch measures
  const MEASURES_URL =
    "http://localhost:1337/api/unit-of-measures1?pagination[limit]=-1";
  const { response: measuresRes } = useFetch(MEASURES_URL);

  useEffect(() => {
    if (measuresRes.data) {
      dispatch(measuresActions.setMeasures(measuresRes.data.data));
    }
  }, [measuresRes, dispatch]);

  // fetch categories
  const { response: categoriesRes } = useFetch(
    "http://localhost:1337/api/categories1?pagination[limit]=-1"
  );
  useEffect(() => {
    dispatch(categoryActions.setCategories(categoriesRes.data.data));
  }, [categoriesRes, dispatch]);

  // fetch products
  const { response: productsRes } = useFetch(
    "http://localhost:1337/api/products1?pagination[limit]=-1&populate=*"
  );
  useEffect(() => {
    dispatch(productsActions.setProducts(productsRes.data.data));
  }, [productsRes, dispatch]);

  // fetch carts
  const { response: cartsRes } = useFetch(
    "http://localhost:1337/api/carts1?pagination[limit]=-1&populate=*"
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
  const location = useLocation();
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const products: ProductsType = useSelector(
    (state: any) => state.products.products
  );

  if (loading.some((l) => l === true))
    return (
      <div className="loading-container">
        <Loader />
      </div>
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
        const foundCart = (cartsRes?.data?.data || []) as any[];
        const cart = foundCart.find((cart) => cart.id === cartId);
        return cart ? cart.attributes.name : "Not Found";
      }
      case `/products/${location.pathname.split("/")[2]}`: {
        const productId: number = +location.pathname.split("/")[2];
        const foundProduct = (productsRes?.data?.data || []) as any[];
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

    return <ProductPage />;
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

    return <Cart />;
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getTitle()}</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart/:id" element={<ValidCartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/measures" element={<Measure />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ValidProductPage />} />
        <Route path="*" element={<SectionHeading position="center" text="404 Not Found" />} />
      </Routes>
    </HelmetProvider>
  );
};
