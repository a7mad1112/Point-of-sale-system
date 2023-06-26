import React from "react";
import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { cartsActions } from "../../../../store/states/cartSlice";
import usePost from "../../../../hooks/usePost";

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
  const URL = "http://localhost:1337/api/carts1?pagination[limit]=-1&populate=*"
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
      try {
        const res = await fetch(URL);
        const data = await res.json();
        dispatch(cartsActions.setCarts(data.data));
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
          <label htmlFor="name">Cart Name</label>
          <input
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
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            onChange={formik.handleChange}
            value={formik.values.desc}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="form-group">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCartModal;
