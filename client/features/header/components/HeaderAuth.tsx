import Box from "@/components/ui/Box";
import Link from "next/link";

const HeaderAuth = () => {
  return (
    <Box className="flex items-center gap-x-5">
      <Link href={"/sign-in"}>SignIn</Link>
      <Link href={"/sign-up"}>SignUp</Link>
    </Box>
  );
};

export default HeaderAuth;
