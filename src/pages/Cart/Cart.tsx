import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CartsType } from "../../types/types";
import ProductsTable from "./Components/ProductsTable/ProductsTable";
import { Box } from "@mui/material";
import usePut from "../../hooks/usePut";
import { cartsActions } from "../../store/states/cartSlice";

const Cart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { putData } = usePut(
    `http://localhost:1337/api/carts1/${id}?populate=*`
  );
  // to find cart
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const cart: any = carts?.find((c) => c.id === Number(id));
  // get products Cart
  const products = cart?.attributes?.products?.data || [];
  // console.log(products[0]);
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

    const URL = "http://localhost:1337/api/carts1?populate=*";
    try {
      const res = await fetch(URL);
      const data = await res.json();
      dispatch(cartsActions.setCarts(data.data));
      // console.log(data.data);
    } catch (error) {
      throw new Error("Failed to post data");
    }
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
          <article style={{margin: "15px 0"}}>
            <p>{cart?.attributes.desc}</p>
          </article>
        )}
        {!products.length ? (
          <p>
            Oops! It seems that your cart is empty. Start adding products to
            your cart to make a purchase. Browse through our selection and click
            the "Add to Cart" button to get started.
          </p>
        ) : (
          <ProductsTable products={products} />
        )}
      </section>
    </>
  );
};

export default Cart;
