import React from "react";
import Navi from "../Navi/Navi";
import Categories from "../Categories/Categories";
import CarList from "../../pages/CarList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarDetail from "../../pages/CarDetail";
import CartDetail from "../../pages/CartDetail";
import CarAdd from "../../pages/CarAdd";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3">
          <Categories />
        </div>
        <div className="col-9">
          
            <Routes>
              <Route path="/" element={<CarList />}></Route>
              <Route path="/cars" element={<CarList />}></Route>
              <Route path="/cars/:id" element={<CarDetail/>}></Route>
              <Route path="/cart" element={<CartDetail/>}></Route>
              <Route path="/car/add" element={<CarAdd/>}></Route>
              <Route path="*" element={<div>Not found</div>}></Route>

            </Routes>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
