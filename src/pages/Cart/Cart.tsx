import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Params } from "react-router-dom";
import { CartsType, CartProduct } from "../../types/types";
import ProductsTable from "./Components/ProductsTable/ProductsTable";
import { Box, Button } from "@mui/material";
import usePut from "../../hooks/usePut";
import { cartsActions } from "../../store/states/cartSlice";
import { isLoadingActions } from "../../store/states/loaderSlice";
import "./cart.css";
const Cart = () => {
  const { id }: Readonly<Params<string>> = useParams();
  const dispatch = useDispatch();
  const { putData } = usePut(
    `http://localhost:1337/api/carts1/${id}?populate=*`
  );
  // to find cart
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const cart: any = carts?.find((c) => c.id === Number(id));

  // inline edit
  const [cartName, setCartName] = useState(cart?.attributes.name);
  const oldName = useRef(cartName);
  const handleChangeName = async () => {
    const trimmedCartName = cartName?.trim();
    const newName = trimmedCartName === "" ? oldName : trimmedCartName;
    // console.log(newName);
    const data = {
      data: {
        name: newName,
      },
    };

    await putData(data);

    const URL =
      "http://localhost:1337/api/carts1?pagination[limit]=-1&populate=*";
    try {
      const res = await fetch(URL);
      const data = await res.json();
      dispatch(cartsActions.setCarts(data.data));
      // console.log(data.data);
    } catch (error) {
      throw new Error("Failed to post data");
    }
  };
  const [matchingCarts, setMatchingCarts] = useState<CartProduct[]>([]);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        dispatch(isLoadingActions.setIsLoading(true));
        const res = await fetch(
          "http://localhost:1337/api/carts-products1?pagination[limit]=-1&cart[id]=25&populate=*"
        );
        const { data } = await res.json();
        setMatchingCarts(data);
      } catch (err) {
        throw new Error("failed to fetch cart");
      } finally {
        dispatch(isLoadingActions.setIsLoading(false));
      }
    };
    if (id) {
      fetchCart();
    }
  }, [id, dispatch]);
  // handle discount and tax
  const [discount, setDiscount] = useState(0);
  const handleDiscount = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setDiscount(+event.target.value);
  };

  const [tax, setTax] = useState(0);
  const handleTax = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTax(+event.target.value);
  };
  // calc total price [before tax and discount]
  // first calc total price of products in cart (each product has price * quantity)
  const sumOfCart = matchingCarts?.reduce(
    (previousValue, currentValue: any) => {
      // const totalPriceOfProduct = currentValue.attributes.quantity * currentValue.attributes.product.data.price;
      const totalPriceOfProduct =
        currentValue.attributes.quantity *
        currentValue.attributes.product.data?.attributes.price;
      return previousValue + totalPriceOfProduct;
    },
    0
  );
  // calc total amount
  const totalAmount = sumOfCart + sumOfCart * tax - sumOfCart * discount;
  // handle checkout [function just change the value of completion in the cart]
  // use useHistory hook to go to hame after checkout cart
  const navigate = useNavigate();
  const handleCheckout = async () => {
    const payload = {
      data: {
        completed: true,
      },
    };
    await putData(payload);
    // re fetch actual carts and filter them:
    // Navigate to Home page and refresh the website
    navigate("/");
    window.location.reload(); // Refresh the website
  };
  return (
    <>
      <section>
        <Box sx={{ textAlign: "left" }} className={`main-heading`}>
          <input
            type="text"
            value={cartName}
            onChange={(e) => {
              if (cartName?.trim().split("").length) oldName.current = cartName;
              setCartName(e.target.value);
            }}
            onBlur={handleChangeName}
          />
        </Box>
        {cart?.attributes.desc && (
          <article style={{ margin: "15px 0" }}>
            <h3>Description</h3>
            <p>{cart?.attributes.desc}</p>
          </article>
        )}
        {!matchingCarts?.length ? (
          <p>
            Oops! It seems that your cart is empty. Start adding products to
            your cart to make a purchase. Browse through our selection and click
            the "Add to Cart" button to get started.
          </p>
        ) : (
          <>
            {/* a field for handle discount */}
            <div className="input-field">
              <label htmlFor="discount">Discount:</label>
              <input
                type="number"
                name="discount"
                id="discount"
                onChange={handleDiscount}
                value={discount}
              />
            </div>
            {/* a field for tax applied */}
            <div className="input-field">
              <label htmlFor="tax">Tax:</label>
              <input
                type="number"
                name="tax"
                id="tax"
                onChange={handleTax}
                value={tax}
              />
            </div>
            <ProductsTable cartsProducts={matchingCarts} />
            <hr />
            <Box marginTop={3} className="total-price">
              <p>Total Amount:</p>
              <span>${sumOfCart ? Math.ceil(totalAmount) : 0}</span>
            </Box>
            <Button
              onClick={handleCheckout}
              sx={{
                my: 4,
                backgroundColor: "var(--yellow-color)",
                color: "#FFFFFF",
                fontWeight: "bold",
                transition: "0.3s",
                "&:hover": {
                  opacity: 0.8,
                  backgroundColor: "var(--red-color)",
                  transform: "translateY(-2px)",
                },
              }}
              variant="contained"
            >
              Checkout
            </Button>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
