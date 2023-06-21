import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../../store/states/categoriesSlice";
import usePut from "../../../../hooks/usePut";
import { CategoriesType } from "../../../../types/types";
const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
});

const initialValues = {
  category: "",
};

type EditCategoryModalProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  URL: string;
};

const EditCategoryModal = ({ setIsShow, URL }: EditCategoryModalProps) => {
  const closeModal = () => setIsShow(false);
  const { putData } = usePut(URL);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const data = {
        data: {
          name: values.category,
        },
      };
      await putData(data);
      try {
        const res = await fetch("http://localhost:1337/api/categories1");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        console.log(data.data);
        dispatch(categoryActions.setCategories(data.data));
      } catch (error) {
        throw new Error("Failed to post data");
      }
      closeModal();
    },
    validationSchema,
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
          <label htmlFor="category">New Name</label>
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
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategoryModal;
