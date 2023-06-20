import { useFormik } from "formik";
import "./modal.css";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";

const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
});

const initialValues = {
  category: "",
};

type CreateCategoryModalProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCategoryModal = ({ setIsShow }: CreateCategoryModalProps) => {
  const closeModal = () => setIsShow(false);

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      // Handle form submission logic here
      closeModal();
      console.log(values);
    },
    validationSchema,
  });

  return (
    <div className="overlay" onClick={e => e.currentTarget === e.target && closeModal()}>
      <form onSubmit={formik.handleSubmit}>
        <i className="close-btn" onClick={closeModal}>
          <IoCloseOutline />
        </i>
        <div className="form-group">
          <label htmlFor="category">Category Name</label>
          <input
            type="text"
            name="category"
            id="category"
            onChange={formik.handleChange}
            value={formik.values?.category}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.category && formik.touched.category && (
          <p className="field-err">{formik.errors.category}</p>
        )}
        <div className="form-group">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryModal;
