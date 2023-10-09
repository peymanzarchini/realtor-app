import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  fullname: Yup.string().required("Please fill out this field").trim(),
  email: Yup.string().email("invalid email").required("Please fill out this field"),
  password: Yup.string()
    .required("Please fill out this field")
    .min(5, "The password must not be less than 5 characters"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
  avatar: Yup.string().required("Please fill out this field"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Please fill out this field"),
  password: Yup.string().required("Please fill out this field"),
});
