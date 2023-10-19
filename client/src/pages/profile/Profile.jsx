import { useSelector } from "react-redux";
import Container from "../../components/Styles/Container";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserSuccess } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import ProgressBar from "react-customizable-progressbar";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const preset_key = "images_preset";
  const cloud_name = "duei0blsa";
  const fileRef = useRef(null);

  const [getUser, setUser] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`);

    xhr.addEventListener("load", function () {
      setUser({ ...getUser, avatar: JSON.parse(xhr.responseText).secure_url });
    });

    xhr.upload.addEventListener("progress", function (e) {
      if (e.lengthComputable) {
        let percent = parseInt((e.loaded / e.total) * 100);
        setShowProgress(true);
        setFilePerc(percent);
      }
    });

    xhr.send(formData);
  };

  const handleChange = (e) => {
    setUser({ ...getUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/users/update/${user._id}`, {
        method: "POST",
        body: JSON.stringify(getUser),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        dispatch(updateUserSuccess(data));
        toast.success("User is updated successfully!");
        setShowProgress(false);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <section className="py-10">
      <h1 className="text-3xl text-center font-semibold">Profile</h1>
      <Container classProps="max-w-[650px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileUpload} />
          <img
            src={getUser.avatar || user.avatar}
            alt="avatar"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
            onClick={() => fileRef.current.click()}
          />
          {showProgress ? (
            <div className="self-center">
              <ProgressBar radius={100} progress={filePerc} />
            </div>
          ) : null}
          <input
            type="text"
            name="fullname"
            className="border p-3 rounded-lg"
            placeholder="fullname"
            defaultValue={user.fullname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="border p-3 rounded-lg"
            placeholder="email"
            defaultValue={user.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            className="border p-3 rounded-lg"
            placeholder="password"
            defaultValue={user.password}
            onChange={handleChange}
          />
          <button type="submit" className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95">
            update
          </button>
        </form>
        <section className="flex justify-between mt-4">
          <div className="text-red-600 cursor-pointer font-bold">Delete Account</div>
          <div className="text-red-600 cursor-pointer font-bold">Sign out</div>
        </section>
      </Container>
    </section>
  );
};

export default Profile;
