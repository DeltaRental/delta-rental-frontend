import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Navi from "./components/Navi/Navi";

function App() {
  return (
    <div className="App h-screen">
      <div
        className="h-screen bg-fixed bg-cover bg-no-repeat bg-black"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/assets/bbblurry2.svg"
          })`,
        }}
      >
        <Navi />

        <Dashboard />
      </div>
    </div>
  );
}

export default App;
