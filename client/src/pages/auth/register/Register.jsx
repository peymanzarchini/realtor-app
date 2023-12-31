import { Link, useNavigate } from "react-router-dom";
import SignupPhoto from "../../../assets/signup.webp";
import Container from "../../../components/styles/Container";
import { Formik } from "formik";
import { registerSchema } from "../../../components/validation/userValidation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Spinner from "../../../components/spinner/Spinner";
import OAuth from "../../../components/oauth/OAuth";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const navigate = useNavigate();
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    setBtnLoading(true);
    try {
      const savedUserResponse = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await savedUserResponse.json();
      if (savedUserResponse.status === 201) {
        navigate("/sign-in");
        toast.success("Registration was successful");
        setLoading(false);
      }

      if (savedUserResponse.status === 400) {
        toast.error("A user has registered with this email");
        setBtnLoading(false);
      }
    } catch (err) {
      toast.error("There was a problem with the registration process, please register again");
      setBtnLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="py-5">
      <h1 className="text-3xl text-center font-semibold">Sign up</h1>
      <Container>
        <div className="flex items-start gap-12 justify-center flex-wrap lg:flex-nowrap py-10">
          <div className="w-[95%] sm:w-[60%] lg:w-[50%]">
            <img src={SignupPhoto} alt="signup" className="mx-auto rounded-sm" />
          </div>
          <div className="flex flex-col w-[100%] sm:w-[80%] lg:w-[50%]">
            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue, handleSubmit, handleBlur, touched, errors }) => (
                <form
                  className="flex flex-col gap-3 w-[100%] sm:w-[80%] sm:mx-auto lg:w-[100%]"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    placeholder="Fullname"
                    className="border p-3 rounded-lg"
                    value={values.fullname}
                    name="fullname"
                    onChange={(e) => setFieldValue("fullname", e.target.value)}
                    onBlur={handleBlur}
                  />
                  {touched.fullname && errors.fullname ? (
                    <div className="text-red-600 text-base">{errors.fullname}</div>
                  ) : null}
                  <input
                    type="text"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    value={values.email}
                    name="email"
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
                    value={values.password}
                    name="password"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password ? (
                    <div className="text-red-600 text-base">{errors.password}</div>
                  ) : null}
                  <input
                    type="password"
                    placeholder="Confirm-Password"
                    className="border p-3 rounded-lg"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
                    onBlur={handleBlur}
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <div className="text-red-600 text-base">{errors.confirmPassword}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 mt-3"
                  >
                    {btnLoading ? "Loading..." : "Sign up"}
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
              <Link to={"/sign-in"}>
                <span className="text-blue-700">Sign in</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Register;
