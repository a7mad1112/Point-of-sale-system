import React from "react";
import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { MeasuresType, CategoriesType, Product } from "../../../types/types";
import { productsActions } from "../../../store/states/productsSlice";
import { TextField } from "@mui/material";
import usePut from "../../../hooks/usePut";

type EditProductModalProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProduct: Product | null;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  code: Yup.string().required("Product Code is required"),
  price: Yup.number().required("Product Price is required"),
  category: Yup.number().required("Category is required"),
  unit_of_measure: Yup.number().required("Measure is required"),
});

const EditProductModal: React.FC<EditProductModalProps> = ({
  setIsShow,
  selectedProduct,
}) => {
  const closeModal = () => setIsShow(false);
  const URL = `http://localhost:1337/api/products1/${selectedProduct?.id}?populate=*`;
  const dispatch = useDispatch();
  const { putData } = usePut(URL);
  const formik = useFormik({
    initialValues: {
      name: selectedProduct?.attributes.name,
      code: selectedProduct?.attributes.code,

      price: selectedProduct?.attributes.price,
      category: selectedProduct?.attributes.category,
      unit_of_measure: selectedProduct?.attributes.unit_of_measure,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // send updated product
      try {
        const payload = {
          data: {
            name: values.name,
            code: values.code,
            price: values.price,
            category: values.category ? +values.category : null,
            unit_of_measure: values.unit_of_measure
              ? +values.unit_of_measure
              : null,
          },
        };
        await putData(payload);
      } catch (error) {
        console.error("Failed to update data:", error);
      }
      // get updated products
      try {
        const res = await fetch(
          "http://localhost:1337/api/products1?pagination[limit]=-1&populate=*",
          {
            method: "GET",
          }
        );
        const data = await res.json();
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
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Product Name"
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
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Product Code"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
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
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Product Price"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
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
            value={formik.values.category?.data?.id}
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
            <p className="field-err">{"Category is required"}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="unit_of_measure">Measure</label>
          <select
            name="unit_of_measure"
            id="unit_of_measure"
            onChange={formik.handleChange}
            value={formik.values.unit_of_measure?.data?.id}
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
          {formik.touched.category && formik.errors.category && (
            <p className="field-err">{"Measure is required"}</p>
          )}
        </div>
        <div className="form-group">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditProductModal;
