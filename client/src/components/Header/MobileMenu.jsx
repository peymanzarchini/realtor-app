import { AiOutlineClose } from "react-icons/ai";
import { BsGithub, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileMenu = ({
  showMenu,
  showPortal,
  items,
  setShowPortal,
  setShowMenu,
  closeMenu,
  changeActive,
}) => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      {showPortal && (
        <>
          <div
            className="fixed top-0 left-0 z-40 bg-black-rgba w-full min-h-screen transition-all duration-300 md:hidden"
            onClick={() => {
              setShowPortal(!showPortal), setShowMenu(false);
            }}
          ></div>
        </>
      )}
      <div
        className={`fixed top-0 z-50 ${
          showMenu ? "left-0" : "left-[-100%]"
        } flex min-h-full w-72 list-none flex-col items-center justify-start bg-white md:hidden transition-all duration-300 text-center`}
      >
        <div className="bg-red-700 rounded-full my-1 py-3 px-3 absolute top-1 right-5 text-white md:hidden">
          <AiOutlineClose fontSize={23} className="cursor-pointer" onClick={closeMenu} />
        </div>
        <div className="mt-24">
          <img src={Logo} alt="logo" className="h-5 cursor-pointer" />
        </div>
        <div className="flex items-center space-x-7 mt-10">
          <BsGithub fontSize={25} className="cursor-pointer text-gray-500 hover:text-red-500" />
          <BsFacebook fontSize={25} className="cursor-pointer text-gray-500 hover:text-red-500" />
          <BsInstagram fontSize={25} className="cursor-pointer text-gray-500 hover:text-red-500" />
          <BsTwitter fontSize={25} className="cursor-pointer text-gray-500 hover:text-red-500" />
        </div>
        <div className="mt-10 border-t-[1px] border-gray-500 w-64"></div>
        <ul className="flex flex-col space-y-5 mt-5 md:hidden">
          {user ? (
            <>
              <li
                className={`text-base mt-1 py-3 text-gray-400 border-b-[3px] border-b-transparent transition duration-200 ${
                  changeActive("/") && "text-red-600 font-bold"
                }`}
              >
                <Link to={"/"} onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li
                className={`text-base mt-1 py-3 text-gray-400 border-b-[3px] border-b-transparent transition duration-200 ${
                  changeActive("/about") && "text-red-600 font-bold"
                }`}
              >
                <Link to={"/about"} onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li
                className={`text-base mt-1 py-3 text-gray-400 border-b-[3px] border-b-transparent transition duration-200 ${
                  changeActive("/profile") && "text-red-600 font-bold"
                }`}
              >
                <Link to={"/profile"} onClick={closeMenu}>
                  Profile
                </Link>
              </li>
              <button className="text-base mt-1 py-3 text-white border-b-[3px] border-b-transparent transition duration-200 cursor-pointer font-bold w-[250px] block bg-red-700 rounded-lg">
                Sign out
              </button>
            </>
          ) : (
            <>
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`text-base mt-1 py-3 text-gray-950 transition duration-200 ${
                    changeActive(`${item.path}`) && "text-red-600 font-bold"
                  }`}
                  onClick={closeMenu}
                >
                  <Link to={item.path}>{item.display}</Link>
                </li>
              ))}
              <li
                className="bg-red-700 rounded-full text-base my-1 py-3 text-white w-52"
                onClick={closeMenu}
              >
                <Link to="/sign-up">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default MobileMenu;
