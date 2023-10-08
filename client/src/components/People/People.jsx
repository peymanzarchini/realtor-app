import pepole1 from "../../assets/people1.jpg";
import pepole2 from "../../assets/people2.jpg";
import { AiOutlineSearch } from "react-icons/ai";

const People = () => {
  return (
    <section className="w-[100%] my-10">
      <div className="flex flex-col lg:flex-row lg:flex-wrap w-[100%]">
        <div className="flex-grow-0 basis-6/12">
          <img src={pepole1} alt="pepole1" className="w-[100%] h-[100%]" />
        </div>
        <div className="flex-grow-0 basis-6/12 bg-white ">
          <div className="flex flex-col justify-center h-[100%] gap-6 py-8 lg:py-0 px-12">
            <h1 className="text-3xl font-bold">Need a home loan? Get pre-approved</h1>
            <p className="text-xl">
              Find a lender who can offer competitive mortgage rates and help you with pre-approval.
            </p>
            <button className="bg-red-600 py-2 px-5 text-white rounded-3xl max-w-xs lg:max-w-sm">
              Get pre-approved now
            </button>
          </div>
        </div>
        <div className="flex-grow-0 basis-6/12 bg-white order-last lg:order-none">
          <div className="flex flex-col justify-center h-[100%] gap-6 py-8 lg:py-0 px-12">
            <h1 className="text-3xl font-bold">Get Local Info</h1>
            <p className="text-xl">
              Does it have pet-friendly rentals? How are the schools? Get important local
              information on the area you re most interested in.
            </p>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 right-[15%] lg:right-[33%] flex items-center px-2.5 rounded-r-full pointer-events-none bg-red-600 overflow-hidden">
                <AiOutlineSearch
                  fontSize={23}
                  className="text-white flex items-center justify-center"
                />
              </div>
              <input
                type="text"
                id="email-address-icon"
                className="w-5/6 lg:w-4/6 rounded-full focus:border-red-600 focus:ring-red-600 placeholder:text-sm"
                placeholder="Address, City, Zip or Neighborhood"
              />
            </div>
          </div>
        </div>
        <div className="flex-grow-0 basis-6/12">
          <img src={pepole2} alt="pepole2" className="w-[100%] h-[100%]" />
        </div>
      </div>
    </section>
  );
};

export default People;
