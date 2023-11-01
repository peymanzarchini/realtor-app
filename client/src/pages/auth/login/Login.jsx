import { Link, useNavigate } from "react-router-dom";
import SigninPhoto from "../../../assets/signin.webp";
import Container from "../../../components/styles/Container";
import { loginSchema } from "../../../components/validation/userValidation";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../../../redux/slices/userSlice";
import OAuth from "../../../components/oauth/OAuth";

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, onSubmitProps) => {
    try {
      setBtnLoading(true);
      const userLogin = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (userLogin.status === 404) {
        toast.error("User not found");
        onSubmitProps.resetForm();
        setBtnLoading(false);
      }

      if (userLogin.status === 401) {
        toast.error("Wrong credentials!");
        setBtnLoading(false);
      }

      if (userLogin.status === 200) {
        const data = await userLogin.json();
        onSubmitProps.resetForm();
        if (data) {
          dispatch(signInSuccess(data));
          setBtnLoading(false);
          navigate("/");
        }
      }
    } catch (err) {
      toast.error("There was a problem with the login process, please login again");
      setBtnLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="py-5">
      <h1 className="text-3xl text-center font-semibold">Sign in</h1>
      <Container>
        <div className="flex items-start gap-12 justify-center flex-wrap lg:flex-nowrap py-10">
          <div className="w-[95%] sm:w-[60%] lg:w-[50%]">
            <img src={SigninPhoto} alt="signin" className="mx-auto rounded-sm" />
          </div>
          <div className="flex flex-col w-[100%] sm:w-[80%] lg:w-[50%]">
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, handleSubmit, handleBlur, touched, errors }) => (
                <form
                  className="flex flex-col gap-3 w-[100%] sm:w-[80%] sm:mx-auto lg:w-[100%]"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    name="email"
                    value={values.email}
                    onChange={(e) => setFieldValue("email", e.target.value)}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email ? (
                    <div className="text-red-600 text-base">{errors.email}</div>
                  ) : null}
                  <input
                    type="password"
                    placeholder="Password"
                    className="border p-3 rounded-lg"
                    name="password"
                    value={values.password}
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password ? (
                    <div className="text-red-600 text-base">{errors.fullname}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 mt-3"
                  >
                    {btnLoading ? "Loading..." : "Sign in"}
                  </button>
                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                  </div>
                  <OAuth />
                </form>
              )}
            </Formik>
            <div className="flex items-center gap-1 sm:justify-center lg:justify-start mt-3">
              <p>Have an account?</p>
              <Link to={"/sign-up"}>
                <span className="text-blue-700">Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
