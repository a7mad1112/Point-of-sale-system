import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./login.css";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  username: Yup.string().min(3).max(12).required("UserName is required"),
  password: Yup.string().min(8).required("Password is required"),
});

const initialValues = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values) => {
      const { password, username } = values;
      const payload = {
        identifier: username,
        password: password,
      };
      try {
        const res = await fetch("http://localhost:1337/api/auth/local", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error("Error auth");
        }
        const response = await res.json();
        const token = response.jwt;
        localStorage.setItem("token", token);
        navigate("/");
      } catch (err) {
        alert(
          "Authentication failed. Please check your Username and Password then try again."
        );
      }
    },
    validationSchema,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="overlay">
      <form onSubmit={formik.handleSubmit}>
        <center style={{ margin: "0 0 1.4rem" }}>
          <h3>Welcome Back</h3>
        </center>
        <div className="form-group">
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Username"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            type="text"
            name="username"
            id="username"
            onChange={formik.handleChange}
            value={formik.values?.username}
            onBlur={formik.handleBlur}
          />
          {formik.errors.username && formik.touched.username && (
            <p className="field-err">{formik.errors.username}</p>
          )}
        </div>
        <div className="form-group">
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            required
            label="Password"
            InputLabelProps={{ className: "textfield-label" }}
            className="textfield"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values?.password}
            onBlur={formik.handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="field-err">{formik.errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
