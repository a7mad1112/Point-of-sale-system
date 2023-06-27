import React from "react";
import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { cartsActions } from "../../../../store/states/cartSlice";
import usePost from "../../../../hooks/usePost";
import { TextField, Button } from "@mui/material";

type CreateCartModalProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Cart Name is required"),
  desc: Yup.string(),
});

const CreateCartModal: React.FC<CreateCartModalProps> = ({ setIsShow }) => {
  const closeModal = () => setIsShow(false);
  const dispatch = useDispatch();
  const URL =
    "http://localhost:1337/api/carts1?pagination[limit]=-1&populate=*";
  const { postData } = usePost(URL);
  const formik = useFormik({
    initialValues: {
      name: "",
      desc: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = {
        data: {
          name: values.name,
          desc: values.desc,
        },
      };
      closeModal();
      await postData(data);
      // after delete the item, we need te reset our state
      const URL =
        "http://localhost:1337/api/carts1?pagination[limit]=-1&populate=*";
      try {
        const res = await fetch(URL);
        const response = await res.json();
        const allCarts: any = response.data;
        // we don't need completed carts[checkout carts], so will filter them
        let filteredCarts = [];
        if (allCarts) {
          filteredCarts = allCarts.filter(
            (cart: any) => !cart.attributes.completed
          );
        }
        dispatch(cartsActions.setCarts(filteredCarts));
      } catch (error) {
        throw new Error("Failed to post data");
      }
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
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Cart Name"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="field-err">{formik.errors.name}</p>
          )}
        </div>

        <div className="form-group">
          <TextField
            multiline
            variant="outlined"
            color="secondary"
            size="small"
            label="Description"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            name="desc"
            id="desc"
            onChange={formik.handleChange}
            value={formik.values.desc}
            onBlur={formik.handleBlur}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateCartModal;
