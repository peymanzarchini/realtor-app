import { Helmet } from "react-helmet-async";
import Trend from "../../components/Trend/Trend";
import News from "../../components/News/News";
import People from "../../components/People/People";
import Advertise from "../../components/Advertise/Advertise";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>realtor</title>
      </Helmet>
      <Hero />
      {/* <Listing/> */}
      <Trend />
      <News />
      <People />
      <Advertise />
    </>
  );
};

export default Home;
