import React from "react";
import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { MeasuresType, CategoriesType } from "../../../types/types";
import { useDispatch } from "react-redux";
import { productsActions } from "../../../store/states/productsSlice";

type CreateProductModalProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  code: Yup.string().required("Product Code is required"),
  price: Yup.number().required("Product Price is required"),
  category: Yup.number().required("Category is required"),
  unit_of_measure: Yup.number().required("Measure is required"),
  images: Yup.mixed().required("Image is required"),
});

const initialValues = {
  name: "",
  code: "",
  price: 0,
  category: "",
  unit_of_measure: "",
  images: [],
};

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  setIsShow,
}) => {
  const closeModal = () => setIsShow(false);
  const URL = "http://localhost:1337/api/products1?populate=*";
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name: values.name,
          code: values.code,
          price: values.price,
          category: +values.category,
          unit_of_measure: +values.unit_of_measure,
        })
      );
      // Append each image file to the formData
      for (let i = 0; i < values.images?.length; i++) {
        formData.append("files.images", values.images[i]);
      }
      // for (let i = 0; i < values.images?.length; i++) console.log(values.images[i]);
      // send product
      try {
        await fetch(URL, {
          method: "POST",
          body: formData,
          headers: {},
        });
      } catch (error) {
        console.error("Failed to post data:", error);
      }
      // get products
      try {
        const res = await fetch(URL, {
          method: "GET",
        });
        const data = await res.json();
        // console.log(data);
        dispatch(productsActions.setProducts(data.data));
      } catch (error) {
        console.error("Failed to get data:", error);
      } finally {
        closeModal();
      }
    },
  });

  // get measure and categories to display them in form
  const measures: MeasuresType = useSelector(
    (state: any) => state.measures?.measures
  );
  const categories: CategoriesType = useSelector(
    (state: any) => state.categories?.categories
  );
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
          <label htmlFor="name">Product Name</label>
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
          <label htmlFor="code">Product Code</label>
          <input
            type="text"
            name="code"
            id="code"
            onChange={formik.handleChange}
            value={formik.values.code}
            onBlur={formik.handleBlur}
          />
          {formik.touched.code && formik.errors.code && (
            <p className="field-err">{formik.errors.code}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="field-err">{formik.errors.price}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Category</option>
            {/* Render the options for categories */}
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.attributes.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="field-err">{formik.errors.category}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="unit_of_measure">Measure</label>
          <select
            name="unit_of_measure"
            id="unit_of_measure"
            onChange={formik.handleChange}
            value={formik.values.unit_of_measure}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Measure</option>
            {/* Render the options for measures */}
            {measures?.map((measure) => (
              <option key={measure.id} value={measure.id}>
                {measure.attributes.name}
              </option>
            ))}
          </select>
          {formik.touched.unit_of_measure && formik.errors.unit_of_measure && (
            <p className="field-err">{formik.errors.unit_of_measure}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            onChange={(e) =>
              formik.setFieldValue(
                "images",
                e.target.files ? e.target.files : null
              )
            }
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

export default CreateProductModal;
