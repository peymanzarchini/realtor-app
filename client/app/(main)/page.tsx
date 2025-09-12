import Box from "@/components/ui/Box";
import Contaienr from "@/components/ui/Container";
import { Typography } from "@/components/ui/Typoragphy";

const HomePage = () => {
  return (
    <section className="w-full">
      <Contaienr>
        <Box>
          <Typography variant="h3" className="text-primary">
            Hello World
          </Typography>
        </Box>
      </Contaienr>
    </section>
  );
};

export default HomePage;
