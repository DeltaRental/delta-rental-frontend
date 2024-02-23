import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteCar, fetchCars, updateCar } from "../../../store/slices/carListSlice";
import { GetAllCarResponse } from "../../../models/cars/response/getAllCarResponse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddCar from "./AddCar";
import UpdateCar from "./UpdateCar";
import { GetAllModelResponse } from "../../../models/carModels/response/getAllModelResponse";
import { GetAllColorResponse } from "../../../models/colors/response/GetAllColorResponse";
import { GetAllBranchResponse } from "../../../models/branches/response/getAllBranchResponse";

type Props = {};

const CarTable = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    
    const carState = useSelector((state: any)=> state.car);
    const [update, setUpdate] = useState(false);
    const [selectedCar, setSelectedCar] = useState<number | null>(null);

    const handleButtonClick = (carId: number) => {
      setUpdate(true); 
      setSelectedCar(carId);
    };
    
    
    const handleCloseModal = () => {
      setUpdate(false); 
    };

    useEffect(() => {
    dispatch(fetchCars())
    }, [dispatch]);

    const handleDeleteCar = async (carId: number) => {
      try {
        await dispatch(deleteCar({ id: carId }));
        dispatch(fetchCars());
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    };
  
    
    
    
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm uppercase bg-sidebar text-gray-200">
          <tr>
            <th scope="col" className="px-2 py-1">Kilometre</th>
            <th scope="col" className="px-2 py-1">Yıl</th>
            <th scope="col" className="px-2 py-1">Günlük Ücret</th>
            <th scope="col" className="px-2 py-1">Plaka</th>
            <th scope="col" className="px-2 py-1">Vites Tipi</th>
            <th scope="col" className="px-2 py-1">Araç Durumu</th>
            <th scope="col" className="px-2 py-1">Yakıt Tipi</th>
            <th scope="col" className="px-2 py-1">Marka-Model</th>
            <th scope="col" className="px-2 py-1">Renk</th>
            <th scope="col" className="px-2 py-1">Şube</th>
            <th scope="col" className="px-2 py-1"></th>
            <th scope="col" className="px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {console.log(carState.cars)}
          {carState.cars.map((car: GetAllCarResponse)=>(
          <tr key={car.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-1">
                {car.kilometer}</td>
              <td className="px-2 py-1">{car.year}</td>
              <td className="px-2 py-1">{car.dailyPrice} </td>
              <td className="px-2 py-1">{car.plate} </td>
              <td className="px-2 py-1">{car.gearType} </td>
              <td className="px-2 py-1">{car.carState}</td>
              <td className="px-2 py-1">{car.fuelType} </td>
              <td className="px-2 py-1">{`${car.model.brandName} ${car.model.name}`} </td>
              <td className="px-2 py-1">{car.color.name} </td>
              <td className="px-2 py-1">{car.branch.name}</td>
              <td className="px-2 py-1">
              <button className="px-2 py-1 bg-sidebar text-gray-100 rounded-lg" 
              onClick={() => handleButtonClick(car.id)}>
              <FontAwesomeIcon icon={faPen}/>
              </button>
            </td>
            <td className="">
              <button className="px-2 rounded-md bg-red-700 text-gray-100" 
              onClick={() => handleDeleteCar(car.id)}>
              <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
      {update && selectedCar && <UpdateCar selectedCar={selectedCar} onCloseModal={handleCloseModal}/>}
    </div>
  );
};

export default CarTable;
