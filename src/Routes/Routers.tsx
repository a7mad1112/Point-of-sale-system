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
import { useSelector } from "react-redux";
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
        <Route
          path="*"
          element={<SectionHeading position="center" text="404 Not Found" />}
        />
      </Routes>
    </HelmetProvider>
  );
};
