import React, { useEffect, useState } from "react";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { AppDispatch } from "../../store/store";
import { fetchCars } from "../../store/slices/carListSlice";
import CarCard from "../../components/CarCard/CarCard";

const CarList = () => {
  const branchesState = useSelector((state: any) => state.branch);
  const carsState = useSelector((state: any) => state.car);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  console.log(carsState);


  return (
    <div className="container mx-auto my-5 min-h-screen">
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-5 ">
        <Toaster />
        {carsState.cars.map((car: GetAllCarResponse) =>
          car.carState == "AVAILABLE" ? (
            <CarCard key={car.id} car={car} />
          ) : null
        )}
      </div>
    </div>
  );
};


export default CarList;
