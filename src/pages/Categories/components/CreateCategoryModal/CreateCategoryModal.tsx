import { useFormik } from "formik";
import "./modal.css";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import usePost from "../../../../hooks/usePost";
import { useDispatch } from "react-redux";
import { categoryActions } from "../../../../store/states/categoriesSlice";
import { TextField, Button } from "@mui/material";
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
      await postData(data);
      // use useFetch here
      try {
        const res = await fetch(url + "?pagination[limit]=-1");
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        // console.log(data.data)
        dispatch(categoryActions.setCategories(data.data));
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
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Category Name"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            type="text"
            name="category"
            id="category"
            onChange={formik.handleChange}
            value={formik.values?.category}
            onBlur={formik.handleBlur}
          />
          {formik.errors.category && formik.touched.category && (
            <p className="field-err">{formik.errors.category}</p>
          )}
        </div>
        <div className="form-group">
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryModal;
