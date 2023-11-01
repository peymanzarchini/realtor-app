import { Link } from "react-router-dom";
import Container from "../styles/Container";
import FlexComponent from "../styles/FlexComponent";
import hero from "../../assets/hero.png";
import cash from "../../assets/cash.svg";
import spot from "../../assets/spot.svg";
import money from "../../assets/money.svg";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-57px)] pb-7">
      <Container>
        <FlexComponent classProps="gap-14 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-10 py-28">
            <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
              Find your next <span className="text-slate-500">perfect</span>
              <br />
              place with ease
            </h1>
            <div className="text-gray-400 text-lg">
              Realtor is the best place to find your next perfect place to live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>
            <button className="text-base mt-1 py-3 text-white border-b-[3px] border-b-transparent transition duration-200 cursor-pointer font-bold w-[250px] block bg-red-700 rounded-full">
              <Link to={"/search"} className="text-xl">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Let's get started...
              </Link>
            </button>
          </div>

          <div>
            <img src={hero} alt="hero" className="w-[490px]" />
          </div>
        </FlexComponent>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-8 mt-10">
          <div className="p-4 min-h-[200px] lg:min-h-[250px] w-full lg:w-[350px] border border-gray-500 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold lg:max-w-[216px]">
                Find out how much you can afford
              </h1>
              <img src={cash} alt="cash" className="w-[48px] h-[48px]" />
            </div>
            <p className="text-lg font-normal mt-5 text-slate-500">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              We'll help you estimate your budget range. Save to your buyer profile to help in your
              search.
            </p>
          </div>
          <div className="p-4 min-h-[200px] lg:min-h-[250px] w-full lg:w-[350px] border border-gray-500 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold max-w-[216px]">Understand your monthly costs</h1>
              <img src={spot} alt="spot" className="w-[48px] h-[48px]" />
            </div>
            <p className="text-lg font-normal mt-5 text-slate-500">
              Get an in-depth look at what your monthly and closing costs will look like based on
              your financial situation and goals.
            </p>
          </div>
          <div className="p-4 min-h-[200px] lg:min-h-[250px] w-full lg:w-[350px] border border-gray-500 rounded-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold max-w-[216px]">Get help with your down payment</h1>
              <img src={money} alt="money" className="w-[48px] h-[48px]" />
            </div>
            <p className="text-lg font-normal mt-5 text-slate-500">
              You may be able to buy a home with just 3.5% down. Saving for that can be
              challenging–down payment assistance programs can help.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
