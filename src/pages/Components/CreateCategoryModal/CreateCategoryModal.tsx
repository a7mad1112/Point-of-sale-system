import { useFormik } from "formik";
import "./modal.css";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import usePost from "../../../hooks/usePost";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../store/states/categoriesSlice";
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
  const url = "http://localhost:1337/api/categories1";
  const { postData } = usePost(url);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const data = {
        data: {
          name: values.category,
        },
      };
      closeModal();
      postData(data);
      // use useFetch here
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        // console.log(data.data)
        dispatch(categoryActions.setCategories(data.data))
      } catch (error) {
        throw new Error("Failed to post data");
      }
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
