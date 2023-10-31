import Container from "../styles/Container";

const Trend = () => {
  return (
    <>
      <section className="bg-Trend-image bg-cover bg-top w-[100%] h-[500px] object-cover">
        <div className="w-[100%] h-[100%] bg-black-rgba-light">
          <Container>
            <div className="flex flex-col items-center justify-center h-[50vh] text-white space-y-8">
              <h1 className="text-3xl md:text-5xl">Trend</h1>
              <h3 className="text-2xl md:text-3xl  text-center font-bold">
                An Oklahoma Mansion Decked Out in ’90s Style Is the Week’s Most Popular Home
              </h3>
              <button className="py-3 px-5 bg-transparent border boder-[3px] hover:bg-red-600 hover:text-white hover:border-red-600 rounded-lg text-xl">
                Read more
              </button>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
};

export default Trend;
