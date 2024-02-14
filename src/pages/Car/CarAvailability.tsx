import toast, { Toaster } from "react-hot-toast";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCars, getFilteredCars, setSelectedCar } from "../../store/slices/carListSlice";
import Link from "../../components/CustomLink/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { CarFilterRequest } from "../../models/cars/requests/CarFilterRequest";

type Props = {};

const CarAvailability = (props: Props) => {
  const location = useLocation();

  const rentalState = useSelector((state: any) => state.rental);
  const branchState = useSelector((state: any) => state.branch);
  const carsState = useSelector((state: any) => state.car);

  const dispatch = useDispatch<AppDispatch>();

  const filteredCars:CarFilterRequest = {
    endDate: rentalState.selectedEndDate,
    startDate: rentalState.selectedStartDate,
    startLocation: branchState.selectedBranch.name,
  };

  useEffect(() => {
    dispatch(getFilteredCars(filteredCars));
  }, []);

  console.log(filteredCars);
  
  const handleAddToCart = (car: GetAllCarResponse) => {
    toast("Araç sepete eklendi.", {
      duration: 4000,
      position: "bottom-right",
      style: {},
      className: "bg-success text-light",
      icon: "👏",
    });
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-3 gap-2 ">
        <Toaster />
        {carsState.filteredCars.map((car: GetAllCarResponse) =>
            <div
              key={car.id}
              className=" rounded-lg w-auto shadow-lg shadow-blue-300/50 m-4 cursor-pointer hover:bg-blue-100 active:bg-blue-100"
            >
              <img
                className="w-full  items-center"
                src="https://www.avis.com.tr/Avis/media/Avis/Cars/n-citroen-c-elysee.png"
                alt=""
              />
              {localStorage.getItem("jsonwebtoken") != null ? (
                <Link to={"/payment"}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(car));
                      handleAddToCart(car);
                    }}
                    className="btn btn-success"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              ) : (
                <Link to={"/login"} state={{ from: location }}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(car));
                      handleAddToCart(car);
                    }}
                    className="btn btn-success"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              )}

              <div className="w-80 items-center flex justify-between">
                <div className="order-first p-2">
                  <p>Araç Özellikleri</p>
                  <ul>
                    <li>{car.modelName}</li>

                    <li>{car.plate}</li>
                    <li>{car.colorName}</li>
                  </ul>
                </div>
                <div className="order-last p-2">
                  <p>Kiralama Koşulları</p>
                  <ul>
                    <li>{car.dailyPrice}</li>
                    <li>{car.kilometer}</li>
                    <li>{car.year} </li>
                  </ul>
                </div>
              </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CarAvailability;
