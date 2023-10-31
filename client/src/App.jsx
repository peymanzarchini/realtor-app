import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/header/Header";
import RoutesComponent from "./components/routes";
import Footer from "./components/footer/Footer";
import Copyright from "./components/copyright/Copyright";
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
