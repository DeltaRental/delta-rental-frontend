import React, { useEffect } from "react";
import Navi from "../Navi/Navi";
import Categories from "../Categories/Categories";
import CarList from "../../pages/Car/CarList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarDetail from "../../pages/Car/CarDetail";
import CarAdd from "../../pages/Car/CarAdd";
import HomePage from "../../pages/HomePage";
import CarAvailability from "../../pages/Car/CarAvailability";
import PaymentPage from "../../pages/PaymentPage/PaymentPage";
import Login from "../../pages/Auth/Login/Login";
import AdminPage from "../../pages/AdminPage/AdminPage";
import Signup from "../../pages/Auth/Signup/Signup";


const Dashboard = () => {
  
  return (
    <>
      
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/cars/getAll" element={<CarList />}></Route>
              <Route path="/cars/getCarAvailability" element={<CarAvailability />}></Route>
              <Route path="/payment" element={<PaymentPage />}></Route>
              <Route path="/cars/:id" element={<CarDetail/>}></Route>
              <Route path="/car/add" element={<CarAdd/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              {/* <Route path="/admin" element={<AdminPage/>}></Route> */}
              <Route path="/signup" element={<Signup/>}></Route>
              <Route path="*" element={<div>Not found</div>}></Route>
            </Routes>
    </>
  );
};

export default Dashboard;
