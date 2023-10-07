import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const helmetContext = {};
  return (
    <>
      <HelmetProvider context={helmetContext}></HelmetProvider>
      {/* <Header/> */}
      <div></div>
      {/* <Footer/> */}
      {/* <Copyright/> */}
      <ToastContainer
        position={"top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
