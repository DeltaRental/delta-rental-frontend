import React, { useEffect, useState } from "react";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AppDispatch } from "../../store/store";
import { fetchCars } from "../../store/slices/carListSlice";

const CarList = () => {
  const branchesState = useSelector((state: any) => state.branch);
  const carsState = useSelector((state: any) => state.car);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  console.log(carsState);

  const handleAddToCart = (car: GetAllCarResponse) => {
    toast("Araç sepete eklendi.", {
      duration: 4000,
      position: "bottom-right",
      style: {},
      className: "bg-success text-light",
      icon: "👏",
    });
  };

  //car.branch.name == branchesState.selectedBranch.name && car.branch.city == branchesState.selectedBranch.city
  return (
    <div className="container mx-auto mt-5">
      <div className="grid grid-cols-3 gap-5">
        <Toaster />
        {carsState.cars.map((car: GetAllCarResponse) =>
          car.carState == "AVAILABLE" ? (
            <div
              key={car.id}
              className=" rounded-lg w-auto shadow-lg bg-delta-yellow shadow-blue-300/50 cursor-pointer hover:bg-blue-100 active:bg-blue-100"
            >
              <img
                className="w-full  items-center"
                src="https://www.avis.com.tr/Avis/media/Avis/Cars/n-citroen-c-elysee.png"
                alt=""
              />
              <button
                id="liveToastBtn"
                onClick={() => handleAddToCart(car)}
                className="btn btn-success"
              >
                Hemen Kirala
              </button>
              <div className="w-full items-center flex justify-between">
                <div className="order-first p-2">
                  <p>Araç Özellikleri</p>
                  <ul>
                    <li>{car.model.brandName}</li>
                    <li>{car.model.name}</li>

                    <li>{car.plate}</li>
                    <li>{car.color.name}</li>
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
          ) : null
        )}
      </div>
    </div>
  );
};

export default CarList;
