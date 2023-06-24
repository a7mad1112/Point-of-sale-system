import React from "react";
import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { CartsType } from "../../../../types/types";

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
  // to add old products:
  const carts: CartsType = useSelector((state: any) => state.carts.carts);
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values)
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
