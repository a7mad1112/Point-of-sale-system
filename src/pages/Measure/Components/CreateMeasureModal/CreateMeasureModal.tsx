import { useFormik } from "formik";
import { IoCloseOutline } from "react-icons/io5";
import * as Yup from "yup";
import usePost from "../../../../hooks/usePost";
import { useDispatch } from "react-redux";
import { measuresActions } from "../../../../store/states/measuresSlice";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
const validationSchema = Yup.object({
  measure: Yup.string().required("Measure is required"),
  Conversion_factor: Yup.number().required("Conversion factor is required"),
  base_unit: Yup.string().required("Base unit is required"),
});

const initialValues = {
  measure: "",
  Conversion_factor: 1,
  base_unit: "",
};

type CreateMeasureModalProps = {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateMeasureModal = ({ setIsShow }: CreateMeasureModalProps) => {
  const closeModal = () => {
    setIsShow(false);
  };
  const URL =
    "http://localhost:1337/api/unit-of-measures1?pagination[limit]=-1";
  const { postData } = usePost(URL);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const payload = {
        data: {
          name: values.measure,
          Conversion_factor: values.Conversion_factor,
          base_unit: values.base_unit,
        },
      };
      closeModal();
      await postData(payload);
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        const data = await res.json();
        dispatch(measuresActions.setMeasures(data.data));
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
        {/* === measure name ===  */}

        <div className="form-group">
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Measure Name"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            type="text"
            name="measure"
            id="measure"
            onChange={formik.handleChange}
            value={formik.values?.measure}
            onBlur={formik.handleBlur}
          />
          {formik.errors.measure && formik.touched.measure && (
            <p className="field-err">{formik.errors.measure}</p>
          )}
        </div>
        {/* === conversion factor ===  */}
        <div className="form-group">
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Conversion Factor"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            type="number"
            name="Conversion_factor"
            id="Conversion_factor"
            onChange={formik.handleChange}
            value={formik.values?.Conversion_factor}
            onBlur={formik.handleBlur}
          />
          {formik.errors.Conversion_factor &&
            formik.touched.Conversion_factor && (
              <p className="field-err">{formik.errors.Conversion_factor}</p>
            )}
        </div>
        {/* === base unit ===  */}
        <div className="form-group">
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Base Unit"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            type="text"
            name="base_unit"
            id="base_unit"
            onChange={formik.handleChange}
            value={formik.values?.base_unit}
            onBlur={formik.handleBlur}
          />
          {formik.errors.base_unit && formik.touched.base_unit && (
            <p className="field-err">{formik.errors.base_unit}</p>
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

export default CreateMeasureModal;
