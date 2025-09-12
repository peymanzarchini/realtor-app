import Box from "@/components/ui/Box";
import Contaienr from "@/components/ui/Container";
import HeaderList from "./components/HeaderList";
import HeaderSearch from "./components/HeaderSearch";
import HeaderAuth from "./components/HeaderAuth";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 w-full bg-white shadow py-5">
      <Contaienr>
        <Box className="flex items-center justify-between">
          <HeaderList />
          <HeaderSearch />
          <HeaderAuth />
        </Box>
      </Contaienr>
    </header>
  );
};

export default Header;
