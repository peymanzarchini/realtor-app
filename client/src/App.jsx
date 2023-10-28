import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header/Header";
import RoutesComponent from "./components/Routes";
import Footer from "./components/Footer/Footer";
import Copyright from "./components/Copyright/Copyright";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";

const App = () => {
  const helmetContext = {};
  return (
    <>
      <HelmetProvider context={helmetContext}>
        <Header />
        <div>
          <RoutesComponent />
        </div>
        <Footer />
        <Copyright />
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
      </HelmetProvider>
    </>
  );
};

export default App;
