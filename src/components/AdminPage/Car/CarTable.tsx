import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { deleteCar, fetchCars, updateCar } from "../../../store/slices/carListSlice";
import { GetAllCarResponse } from "../../../models/cars/response/getAllCarResponse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddCar from "./AddCar";
import UpdateCar from "./UpdateCar";
import { GetAllModelResponse } from "../../../models/carModels/response/getAllModelResponse";
import { GetAllColorResponse } from "../../../models/colors/response/GetAllColorResponse";
import { GetAllBranchResponse } from "../../../models/branches/response/getAllBranchResponse";
import Modal from "../../Modal/Modal";

type Props = {
  
};

const CarTable = (props: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const carState = useSelector((state: any)=> state.car);
    const [update, setUpdate] = useState(false);
    const [selectedCar, setSelectedCar] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

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
  
     const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setSearchQuery(e.target.value);
      
     };
     
     const filteredCars = carState.cars.filter((car: GetAllCarResponse) => {
       const searchTerm = searchQuery.toLowerCase();
       const brandMatch = car.model.brandName.toLowerCase().includes(searchTerm);
       const branchMatch = car.branch.name?.toLowerCase().includes(searchTerm);
       const carStateMatch = car.carState?.toLowerCase().includes(searchTerm);
   return brandMatch || branchMatch || carStateMatch;
     });
    
  return (
    <div className="relative w-full overflow-x-auto rounded-lg shadow-xl shadow-gray-400 mr-[3rem]">
       <div className='h-10 mt-4 bg-white border border-gray-200 rounded-lg shadow-lg flex items-center'>
            <FontAwesomeIcon icon={faSearch} className='pl-1 text-gray-400'/>
            <input type="text" 
            value={searchQuery}
            onChange={handleSearchInputChange}
            className='h-7 w- mt-1 border-none focus:outline-none focus:ring-1 focus:ring-white
            rounded-lg content-center'/>
        </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
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
          {filteredCars.map((car: any)=>(
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
      {update && selectedCar !== null && (
        <Modal onCloseModal={handleCloseModal}>
        <UpdateCar selectedCar={selectedCar} onCloseModal={handleCloseModal}/>
        </Modal>
      )}
    </div>
  );
};

export default CarTable;
