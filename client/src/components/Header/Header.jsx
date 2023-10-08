import { useState } from "react";
import Container from "../Styles/Container";
import FlexComponent from "../Styles/FlexComponent";
import Logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const navLink = [
    { display: "Home", path: "/" },
    { display: "Offers", path: "/offers" },
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
              <li className="bg-red-700 rounded-full text-base my-1 py-3 px-8 text-white">
                <Link to="/sign-up">Signup</Link>
              </li>
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
