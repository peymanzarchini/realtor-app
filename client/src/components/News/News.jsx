import { Link } from "react-router-dom";
import Container from "../styles/Container";
import news1 from "../../assets/news1.jpg";
import news2 from "../../assets/news2.jpg";
import news3 from "../../assets/news3.jpg";
import news4 from "../../assets/news4.jpg";

const News = () => {
  return (
    <section className="w-[100%] my-5">
      <h1 className="text-3xl md:text-4xl font-bold text-center">News</h1>
      <div className="pt-8">
        <Container>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            <div className="max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow relative z-0">
              <span className="absolute top-2 left-2 text-sm bg-red-600 text-white py-1 px-2 rounded-lg z-10">
                Trends
              </span>
              <Link to={"#"} className="overflow-hidden">
                <img
                  src={news1}
                  className="w-[100%] rounded-t-lg hover:scale-110 transition duration-300"
                  alt="news"
                />
              </Link>
              <div className="p-5 flex-grow">
                <p className="mb-3 font-normal text-gray-800">
                  The Cities Where Homes Are Selling the Most Above List Price—and Where Buyers Can
                  Snag the Best Deals
                </p>
              </div>
              <div className="p-5">
                <button className="py-1 px-3 bg-red-600 rounded-sm text-sm text-white">
                  Read more
                </button>
              </div>
            </div>
            <div className="max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow relative z-0">
              <span className="absolute top-2 left-2 text-sm bg-red-600 text-white py-1 px-2 rounded-lg z-10">
                Home Improvement
              </span>
              <Link to={"#"} className="overflow-hidden">
                <img
                  src={news2}
                  className="w-[100%] rounded-t-lg hover:scale-110 transition duration-300"
                  alt="news"
                />
              </Link>
              <div className="p-5 flex-grow">
                <p className="mb-3 font-normal text-gray-800">
                  Page Turner of ‘Fix My Flip’ Reveals the One Thing That’ll Always Make Any Kitchen
                  Feel High-End
                </p>
              </div>
              <div className="p-5">
                <button className="py-1 px-3 bg-red-600 rounded-sm text-sm text-white">
                  Read more
                </button>
              </div>
            </div>
            <div className="max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow relative z-0">
              <span className="absolute top-2 left-2 text-sm bg-red-600 text-white py-1 px-2 rounded-lg z-10">
                Unique Homes
              </span>
              <Link to={"#"} className="overflow-hidden">
                <img
                  src={news3}
                  className="w-[100%] rounded-t-lg hover:scale-110 transition duration-300"
                  alt="news"
                />
              </Link>
              <div className="p-5 flex-grow">
                <p className="mb-3 font-normal text-gray-800">
                  Would You Live Here? Converted Grain Bins Hide a Home on 386 Acres in Washington
                </p>
              </div>
              <div className="p-5">
                <button className="py-1 px-3 bg-red-600 rounded-sm text-sm text-white">
                  Read more
                </button>
              </div>
            </div>
            <div className="max-w-sm flex flex-col bg-white border border-gray-200 rounded-lg shadow relative z-0">
              <span className="absolute top-2 left-2 text-sm bg-red-600 text-white py-1 px-2 rounded-lg z-10">
                Home Improvement
              </span>
              <Link to={"#"} className="overflow-hidden">
                <img
                  src={news4}
                  className="w-[100%] rounded-t-lg hover:scale-110 transition duration-300"
                  alt="news"
                />
              </Link>
              <div className="p-5 flex-grow">
                <p className="mb-3 font-normal text-gray-800">
                  The Cities Where Homes Are Selling the Most Above List Price—and Where Buyers Can
                  Snag the Best Deals
                </p>
              </div>
              <div className="p-5">
                <button className="py-1 px-3 bg-red-600 rounded-sm text-sm text-white">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default News;
