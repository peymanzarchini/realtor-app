import { BsGooglePlay, BsApple } from "react-icons/bs";

const Store = () => {
  return (
    <section className="py-5">
      <h1 className="text-2xl font-bold text-white">GET THE APP</h1>
      <div className="flex items-center flex-wrap gap-5 pt-3">
        <button className="bg-white text-black flex items-center py-3 px-5 rounded-md gap-1 hover:bg-red-600 hover:text-white">
          <BsApple fontSize={23} />
          App store
        </button>
        <button className="bg-white text-black flex items-center py-3 px-5 rounded-md gap-1 hover:bg-red-600 hover:text-white">
          <BsGooglePlay />
          Play store
        </button>
      </div>
    </section>
  );
};

export default Store;
