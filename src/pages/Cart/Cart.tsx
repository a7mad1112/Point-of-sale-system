import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CartsType } from "../../types/types";
import SectionHeading from "../Components/SectionHeading/SectionHeading";
import ProductsTable from "./Components/ProductsTable/ProductsTable";

const Cart = () => {
  const { id } = useParams();
  // to find cart
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const cart: any = carts?.find((c) => c.id === Number(id));
  // get products Cart
  const products = cart?.attributes?.products?.data || [];
  console.log(products[0]);
  return (
    <>
      <section>
        <SectionHeading
          position="left"
          text={`${cart?.attributes.name} Cart`}
        />
        {cart?.attributes.desc && (
          <article>
            <h3>{cart?.attributes.desc}</h3>
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
