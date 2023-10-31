import { Helmet } from "react-helmet-async";
import Trend from "../../components/trend/Trend";
import News from "../../components/news/News";
import People from "../../components/people/People";
import Advertise from "../../components/advertise/Advertise";
import Hero from "../../components/hero/Hero";
import Popular from "../../components/popular/Popular";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>realtor</title>
      </Helmet>
      <Hero />
      <Popular />
      <Trend />
      <News />
      <People />
      <Advertise />
    </>
  );
};

export default Home;
