import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { deleteRental, rentalList } from '../../../store/slices/rentalSlice';
import { GetAllRentalResponse } from '../../../models/rentals/response/GetAllRentalResponse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {}

const Rentals = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const rentalState = useSelector((state: any)=>state.rental);

  useEffect(()=>{
    dispatch(rentalList())
  }, [dispatch]);

  const handleDeleteCar = async (rentalId: number) => {
    try {
      await dispatch(deleteRental({ id: rentalId }));
      dispatch(rentalList());
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  return (
    <div className="relative overflow-x-auto rounded-lg shadow-xl shadow-gray-400 mt-6">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 ">
        <thead className="text-sm uppercase bg-delta-green-1000 text-delta-green-400">
          <tr>
            <th scope="col" className="px-2 py-1">Başlangıç</th>
            <th scope="col" className="px-2 py-1">Bitiş </th>
            <th scope="col" className="px-2 py-1">Teslim </th>
            <th scope="col" className="px-2 py-1">Ücret</th>
            <th scope="col" className="px-2 py-1">Plaka</th>
            <th scope="col" className="px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {rentalState.rentals.map((rental: GetAllRentalResponse)=>(
          <tr key={rental.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-1">
                {new Date(rental.startDate).toLocaleDateString()}</td>
              <td className="px-2 py-1">{new Date(rental.endDate).toLocaleDateString()}</td>
              <td className="px-2 py-1">{new Date(rental.returnDate).toLocaleDateString()} </td>
              <td className="px-2 py-1">{`${rental.totalPrice} TL`}</td>
              <td className="px-2 py-1">{rental.car.plate} </td>
            <td className="">
              <button className="px-2 rounded-md bg-red-700 text-delta-green-400" 
              onClick={() => handleDeleteCar(rental.id)}>
              <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
            ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default Rentals