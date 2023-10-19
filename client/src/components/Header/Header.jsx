import { useState } from "react";
import Container from "../Styles/Container";
import FlexComponent from "../Styles/FlexComponent";
import Logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const navLink = [
    { display: "Home", path: "/" },
    { display: "About", path: "/about" },
    { display: "Signin", path: "/sign-in" },
  ];

  const handleShowMenu = () => {
    setShowPortal(!showPortal);
    setShowMenu(!showMenu);
  };

  const handleCloseMenu = () => {
    setShowPortal(false);
    setShowMenu(false);
  };

  const handleChangeActiveClasses = (route) => {
    return route === location.pathname ? true : false;
  };

  return (
    <>
      <header className="w-[100%] bg-white border-b shadow-sm sticky top-0 z-40">
        <Container>
          <FlexComponent>
            <div>
              <img src={Logo} alt="logo" className="h-5 cursor-pointer" />
            </div>
            <ul className={`hidden md:flex md:items-center md:space-x-10`}>
              {user ? (
                <>
                  <li
                    className={`text-base mt-1 py-3 text-gray-400 border-b-[3px] border-b-transparent transition duration-200 ${
                      handleChangeActiveClasses("/") && "text-gray-950 !border-b-red-500 font-bold"
                    }`}
                  >
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li
                    className={`text-base mt-1 py-3 text-gray-400 border-b-[3px] border-b-transparent transition duration-200 ${
                      handleChangeActiveClasses("/about") &&
                      "text-gray-950 !border-b-red-500 font-bold"
                    }`}
                  >
                    <Link to={"/about"}>About</Link>
                  </li>
                  <li>
                    <Link to={"/profile"}>
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="rounded-full w-10 h-10 object-cover"
                      />
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {navLink.map((item, index) => (
                    <li
                      key={index}
                      className={`text-base mt-1 py-3 text-gray-400 border-b-[3px] border-b-transparent transition duration-200 ${
                        handleChangeActiveClasses(`${item.path}`) &&
                        "text-gray-950 !border-b-red-500 font-bold"
                      }`}
                    >
                      <Link to={item.path}>{item.display}</Link>
                    </li>
                  ))}
                  <li className="bg-red-700 rounded-full text-base my-1 text-white cursor-pointer">
                    <Link to="/sign-up" className="block py-3 px-8">
                      Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="bg-red-700 rounded-full my-1 py-3 px-3 text-white md:hidden">
              <GiHamburgerMenu fontSize={23} className="cursor-pointer" onClick={handleShowMenu} />
            </div>
          </FlexComponent>
        </Container>
      </header>
      <MobileMenu
        showMenu={showMenu}
        showPortal={showPortal}
        setShowPortal={setShowPortal}
        setShowMenu={setShowMenu}
        closeMenu={handleCloseMenu}
        items={navLink}
        changeActive={handleChangeActiveClasses}
      />
    </>
  );
};

export default Header;
