import React, { useEffect, useState } from "react";
import { CarModel } from "../../model/CarModel";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AppDispatch } from "../../store/store";
import { fetchCars } from "../../store/slices/carListSlice";

const CarList = () => {
  const branchesState = useSelector((state: any) => state.branch);
  const carsState = useSelector((state:any) => state.car);

	const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchCars());
	}, []);

  console.log(carsState);
  

  const handleAddToCart = (car: CarModel) => {
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
      <div className="grid grid-cols-3 gap-5 ">
        <Toaster />
        {carsState.cars.map((car:CarModel) => ( 
          car.carState == "AVAILABLE" ? (
          <div
            key={car.id}
            className=" rounded-lg w-auto shadow-lg shadow-blue-300/50 cursor-pointer hover:bg-blue-100 active:bg-blue-100"
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
         ) : (null)
        ))}
      </div>
    </div>
  );
};

export default CarList;
