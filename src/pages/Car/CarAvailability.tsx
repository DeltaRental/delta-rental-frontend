import toast, { Toaster } from "react-hot-toast";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCars, getFilteredCars, setSelectedCar } from "../../store/slices/carListSlice";
import Link from "../../components/CustomLink/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { CarFilterRequest } from "../../models/cars/requests/CarFilterRequest";
import FilteredCarCard from "../../components/CarCard/FilteredCarCard";

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
    <div className="container mx-auto mt-5 min-h-screen">
      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-5">
        <Toaster />
        {carsState.filteredCars.map((car: GetAllCarResponse) =>
            <FilteredCarCard key={car.id} car={car} />
        )}
      </div>
    </div>
  );
};

export default CarAvailability;
