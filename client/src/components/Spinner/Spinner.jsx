import spinner from "../../assets/spinner.svg";

const Spinner = () => {
  return (
    <div className="bg-main-background flex items-center justify-center fixed top-0 right-0 left-0 bottom-0 z-50">
      <div>
        <img src={spinner} alt="loading..." className="h-[10rem]" />
      </div>
    </div>
  );
};

export default Spinner;
