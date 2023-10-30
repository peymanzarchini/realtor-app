import { Fragment } from "react";
import { useSelector } from "react-redux";
import Container from "../../components/Styles/Container";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUserSuccess,
  signOutUserSuccess,
  updateUserSuccess,
} from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import ProgressBar from "react-customizable-progressbar";
import { confirmAlert } from "react-confirm-alert";
import { Link, useNavigate } from "react-router-dom";
import ProductSpinner from "../../components/Spinner/productSpinner";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Menu, Transition } from "@headlessui/react";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const preset_key = "images_preset";
  const cloud_name = "duei0blsa";
  const fileRef = useRef(null);

  const [getUser, setUser] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

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

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/delete/${user._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data) {
        dispatch(deleteUserSuccess(data));
        toast.success("User deleted successfully");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const modalDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-slate-600 p-4 border border-solid border-sky-500 rounded-xl">
            <h1 className="text-yellow-500 mb-1">Delete user</h1>
            <p className="text-white">{`Are you sure you want to delete ${
              user && user.fullname
            }?`}</p>
            <div className="flex items-center gap-5 mt-3">
              <button
                className="bg-green-500 text-white py-2 px-8 rounded-lg hover:bg-green-700"
                onClick={() => {
                  handleDeleteUser();
                  onClose();
                }}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white py-2 px-8 rounded-lg hover:bg-red-700"
                onClick={onClose}
              >
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("http://localhost:5000/users/signout", {
        credentials: "include",
      });
      const data = await res.json();
      if (data) {
        dispatch(signOutUserSuccess(data));
        navigate("/sign-in");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleShowListings = async () => {
    try {
      setLoading(true);
      setShowListingsError(false);
      const res = await fetch(`http://localhost:5000/users/listings/${user._id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
      setLoading(false);
    } catch (error) {
      setShowListingsError(true);
      setLoading(false);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`http://localhost:5000/listing/delete/${listingId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      toast.error(error.message);
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
            Update
          </button>
          <Link
            to={`/create-listing`}
            className="bg-green-700 text-white p-3 rounded-lg text-center hover:opacity-95"
          >
            Create listing
          </Link>
        </form>
        <section className="flex justify-center sm:justify-between mt-5 flex-wrap gap-5 sm:gap-0">
          <div
            className="text-red-700 cursor-pointer font-bold rounded-full text-base"
            onClick={modalDelete}
          >
            Delete Account
          </div>
          <div
            className="text-red-700 cursor-pointer font-bold rounded-full text-base"
            onClick={handleSignOut}
          >
            Sign out
          </div>

          <button
            className="text-green-700 w-full mt-7 font-bold text-xl"
            onClick={handleShowListings}
          >
            Show listings
          </button>
          {loading ? (
            <div className="mx-auto w-full">
              <ProductSpinner />
            </div>
          ) : null}
          <p className="text-red-700 mt-5">{showListingsError ? "Error showing listings" : ""}</p>
          {userListings && userListings.length > 0 && (
            <div className="flex flex-col gap-4 mx-auto w-full">
              <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-3 flex justify-between items-center gap-4"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-16 w-16 object-contain"
                    />
                  </Link>
                  <Link
                    className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>

                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <IoMdArrowDropdown fontSize={25} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-[75px] mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            <div className="group flex w-full items-center rounded-md cursor-pointer gap-2 hover:bg-slate-500">
                              <BiEdit fontSize={25} />
                              <Link to={`/update-listing/${listing._id}`}>
                                <p className="text-base">Edit</p>
                              </Link>
                            </div>
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            <div className="group flex w-full items-center rounded-md cursor-pointer gap-2 hover:bg-slate-500">
                              <AiTwotoneDelete fontSize={25} />
                              <p
                                className="text-base"
                                onClick={() => handleDeleteListing(listing._id)}
                              >
                                Delete
                              </p>
                            </div>
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            <div className="group flex w-full items-center rounded-md cursor-pointer gap-2 hover:bg-slate-500">
                              <GrView fontSize={25} />
                              <p className="text-base">view</p>
                            </div>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ))}
            </div>
          )}
        </section>
      </Container>
    </section>
  );
};

export default Profile;
