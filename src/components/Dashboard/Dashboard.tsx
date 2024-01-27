import React from "react";
import Navi from "../Navi/Navi";
import Categories from "../Categories/Categories";
import CarList from "../../pages/Car/CarList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarDetail from "../../pages/Car/CarDetail";
import CarAdd from "../../pages/Car/CarAdd";
import HomePage from "../../pages/HomePage";
import CarAvailability from "../../pages/Car/CarAvailability";

const Dashboard = () => {
  return (
    <div>
      <div className="row">
        <div className="col-12">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/cars/getAll" element={<CarList />}></Route>
              <Route path="/cars/getCarAvailability" element={<CarAvailability />}></Route>
              <Route path="/cars/:id" element={<CarDetail/>}></Route>
              <Route path="/car/add" element={<CarAdd/>}></Route>
              <Route path="*" element={<div>Not found</div>}></Route>
            </Routes>
            
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
