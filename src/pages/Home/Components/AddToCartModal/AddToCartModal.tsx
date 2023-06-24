import React from "react";
import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct, CartsType } from "../../../../types/types";
import usePost from "../../../../hooks/usePost";
import { cartProductsActions } from "../../../../store/states/cartProductsSlice";

type AddToCartModalProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProductId: number;
};

const validationSchema = Yup.object({
  cart: Yup.number().required("Cart is required"),
});

const initialValues = {
  cart: "",
};

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  setIsShow,
  selectedProductId,
}) => {
  const closeModal = () => setIsShow(false);
  const dispatch = useDispatch();
  const { postData } = usePost(
    "http://localhost:1337/api/carts-products1?populate=*"
  );
  const cartProducts: CartProduct[] = useSelector(
    (state: any) => state.cartProducts.cartProducts
  );
  // to add old products:
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // we need to check if exist in cart with same product id then increase quantity
      // otherwise post request
      // const isMatchedCart =
      const matchingCarts = cartProducts.filter(
        (cartProd) => cartProd?.attributes.cart.data.id === +values.cart
      );
      const foundCart = matchingCarts.find(
        (cartProd) => +cartProd?.attributes.product.data.id === +selectedProductId
      );
      const data = {
        data: {
          quantity: 1,
          product: selectedProductId,
          cart: values.cart,
        },
      };

      if (foundCart === undefined) {
        postData(data);
      } else {
        const putData = {
          data: {
            quantity: 1 + foundCart?.attributes?.quantity,
          },
        };
        try {
          await fetch(
            `http://localhost:1337/api/carts-products1/${foundCart?.id}?populate=*`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(putData),
            }
          );
        } catch (error) {
          console.error("Error occurred while making PUT request:", error);
        }
      }
      // re fetch data to store it in our redux store
      try {
        const res = await fetch("http://localhost:1337/api/carts-products1?populate=*");
        const data = await res.json();
        dispatch(cartProductsActions.setCartProducts(data.data));
      } catch (error) {
        throw new Error("Failed to post data");
      }
      closeModal();
    },
  });
  return (
    <div
      className="overlay"
      onClick={(e) => e.currentTarget === e.target && closeModal()}
    >
      <form onSubmit={formik.handleSubmit}>
        <i className="close-btn" onClick={closeModal}>
          <IoCloseOutline />
        </i>
        <div className="form-group">
          <label htmlFor="cart">Choose Cart</label>
          <select
            name="cart"
            id="cart"
            onChange={formik.handleChange}
            value={formik.values.cart}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Cart</option>
            {/* Render the options for carts */}
            {carts?.map((cart) => (
              <option key={cart.id} value={cart.id}>
                {cart.attributes.name}
              </option>
            ))}
          </select>
          {formik.touched.cart && formik.errors.cart && (
            <p className="field-err">{formik.errors.cart}</p>
          )}
        </div>
        <div className="form-group">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default AddToCartModal;
