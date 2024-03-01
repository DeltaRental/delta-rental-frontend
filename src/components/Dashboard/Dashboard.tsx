import React, { useEffect, useState } from "react";
import Navi from "../Navi/Navi";
import Categories from "../Categories/Categories";
import CarList from "../../pages/Car/CarList";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import CarDetail from "../../pages/Car/CarDetail";
import CarAdd from "../../pages/Car/CarAdd";
import HomePage from "../../pages/HomePage/HomePage";
import CarAvailability from "../../pages/Car/CarAvailability";
import PaymentPage from "../../pages/PaymentPage/PaymentPage";
import Login from "../../pages/Auth/Login/Login";
import AdminPage from "../../pages/AdminPage/AdminPage";
import Signup from "../../pages/Auth/Signup/Signup";
import About from "../../pages/About/About";
import UserPanel from "../../pages/User/UserPanel";
import Rentals from "../../pages/User/Rentals";
import Invoices from "../../pages/User/Invoices";
import UserInfo from "../../pages/User/UserInfo";
import PrivateRoutes from "../../core/utils/PrivateRoutes/PrivateRoutes";

import { useDispatch, useSelector } from "react-redux";
import { MyJwtPayload } from "../../models/JwtTokenPayload/MyJwtPayload";
import { jwtDecode } from "jwt-decode";

import { AppDispatch } from "../../store/store";
import { userInfo } from "../../store/slices/userSlice";
import PaymentSuccess from "../../pages/PaymentPage/PaymentSuccess";
import InvoiceByRental from "../InvoiceListByUser/InvoiceByRental";

import Contact from "../../pages/Contact/Contact";
import Branch from "../../pages/Branch/Branch";

const Dashboard = () => {
  const userState = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [decode, setDecode] = useState<MyJwtPayload>();

  useEffect(() => {
    let token: string | null = localStorage.getItem("jsonwebtoken");
    if (token) {
      const jwtDecoded = jwtDecode(token) as MyJwtPayload;
      setDecode(jwtDecoded);
      dispatch(userInfo(jwtDecoded.email || ""));
    }
  }, []);

  console.log(userState);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cars/getAll" element={<CarList />}></Route>
        <Route
          path="/cars/getCarAvailability"
          element={<CarAvailability />}
        ></Route>
        {/* <Route path="/cars/:id" element={<CarDetail />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/branch" element={<Branch />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/payment/success" element={<PaymentSuccess />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/payment" element={<PaymentPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>

          <Route path="/profile" element={<UserPanel />}>
            <Route index element={<UserInfo />} />
            <Route path="/profile/rentals" element={<Rentals />} />
            <Route
              path="/profile/rentals/:id"
              element={<InvoiceByRental />}
            ></Route>
            <Route path="/profile/invoices" element={<Invoices />} />
          </Route>
        </Route>

        <Route path="*" element={<div>Not found</div>}></Route>
      </Routes>
    </>
  );
};

export default Dashboard;
