import Container from "../styles/Container";
import FlexComponent from "../styles/FlexComponent";
import Logo from "../../assets/logo.svg";
import { BsGithub, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import Links from "../links";
import Store from "../store";

const Footer = () => {
  return (
    <footer className="w-[100%] bg-footer-background">
      <Container classProps="py-10">
        <div className="flex flex-col gap-10">
          <FlexComponent classProps="flex-wrap gap-5 sm:flex-nowrap">
            <div className="bg-white py-3 px-5 rounded-full">
              <img src={Logo} alt="logo" className="w-[120px]" />
            </div>
            <div className="flex items-center gap-14">
              <BsGithub
                fontSize={30}
                className="cursor-pointer rounded-full text-white hover:text-red-500"
              />
              <BsFacebook fontSize={30} className="cursor-pointer text-white hover:text-red-500" />
              <BsInstagram fontSize={30} className="cursor-pointer text-white hover:text-red-500" />
              <BsTwitter fontSize={30} className="cursor-pointer text-white hover:text-red-500" />
            </div>
          </FlexComponent>
          <Links />
          <Store />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
