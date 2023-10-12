import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import RoutesComponent from "./components/Routes";
import Footer from "./components/Footer/Footer";
import Copyright from "./components/Copyright/Copyright";

const App = () => {
  const helmetContext = {};
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
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
    </div>
  );
};

export default App;
