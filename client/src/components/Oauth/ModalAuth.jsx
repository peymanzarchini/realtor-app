import { AiOutlineClose } from "react-icons/ai";
import OAuth from "./OAuth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";
import { signInSuccess } from "../../redux/slices/userSlice";

const ModalAuth = ({ closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = {
    email,
    password,
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const userLogin = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await userLogin.json();

      if (data.success === false) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      dispatch(signInSuccess(data));
      setLoading(false);
      closeModal();
      navigate("/");
    } catch (err) {
      toast.error("There was a problem with the login process, please login again");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none px-5">
        <div className="relative my-6 mx-auto w-[500px]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h1 className="text-2xl font-semibold">Sign in</h1>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <AiOutlineClose fontSize={25} />
              </button>
            </div>
            {/*body*/}
            <form onSubmit={handleSubmit} className="relative p-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Email"
                className="border p-3 rounded-lg w-full"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-3 rounded-lg w-full"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 mt-3"
              >
                Sign in
              </button>
              <OAuth />
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalAuth;
