import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Navi from "./components/Navi/Navi";
import OverlayLoader from "./components/OverlayLoader/OverlayLoader";
import { useEffect } from "react";
import axiosInstance from "./core/utils/interceptors/axiosInterceptors";
import AdminPage from "./pages/AdminPage/AdminPage";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-[#292929] relative z-0">
        <div className="">
          <div className="flex justify-center ">
            <div className="absolute bg-transparent  stars bg-fixed h-full bg-cover bg-no-repeat"></div>
            <div className="absolute bg-transparent stars2 w-full bg-fixed h-full bg-cover bg-no-repeat"></div>
            <div className="absolute bg-transparent stars3 w-full bg-fixed h-full bg-cover bg-no-repeat"></div>
          </div>
          <div className="">
            <div className="absolute bg-transparent  stars bg-fixed h-full bg-cover bg-no-repeat"></div>
            <div className="absolute bg-transparent stars2 w-full bg-fixed h-full bg-cover bg-no-repeat"></div>
            <div className="absolute bg-transparent stars3 w-full bg-fixed h-full bg-cover bg-no-repeat"></div>
          </div>
        </div>
        <div className="App z-50">
          {/* <div
        className="h-screen bg-fixed bg-cover bg-no-repeat bg-black"
        style={{
          
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/bbblurry2.svg"
          })`,
        }}
      > */}
          <OverlayLoader />
          <Navi />
          <Dashboard/>
          <Footer></Footer>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default App;
