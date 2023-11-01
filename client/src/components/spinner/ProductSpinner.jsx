import spinner from "../../assets/Spinner-1s-200px.svg";

const ProductSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <img src={spinner} alt="loading..." className="h-[5rem]" />
    </div>
  );
};

export default ProductSpinner;
