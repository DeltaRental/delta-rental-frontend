import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Navi from "./components/Navi/Navi";
import OverlayLoader from "./components/OverlayLoader/OverlayLoader";
import { useEffect } from "react";
import axiosInstance from "./core/utils/interceptors/axiosInterceptors";
import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
    return (
      
    <div className="App ">
      
      <div
        className="h-screen bg-fixed bg-cover bg-no-repeat bg-black"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/bbblurry2.svg"
          })`,
        }}
      >
        <OverlayLoader />
        <Navi />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
