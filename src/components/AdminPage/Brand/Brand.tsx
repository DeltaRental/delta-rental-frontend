import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../store/store'
import { brandList, deleteBrand } from '../../../store/slices/brandSlice'
import AddBrand from './AddBrand'
import UpdateBrand from './UpdateBrand'
import { GetAllBrandResponse } from '../../../models/brands/response/getAllBrandResponse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
type Props = {}

const Brand = (props: Props) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any)=> state.brand);

  
  useEffect(()=>{
    dispatch(brandList());
  }, []);


  const handleDeleteBrand = async (brandId: number) => {
    try {
      await dispatch(deleteBrand({ id: brandId }));
      dispatch(brandList());
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="shadow-xl shadow-gray-400 rounded-lg mt-6">
      <table className="w-full border text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className=" text-sm uppercase bg-sidebar text-gray-200">
          <tr>
            <th scope="col" className="px-2 py-1">Marka</th>
            <th scope="col" className="px-2 py-1">Güncelle</th>
            <th scope="col" className="px-2 py-1">Sil</th>
          </tr>
        </thead>
        <tbody>
          {console.log(brandState.brands)}
          {brandState.brands.map((brand: GetAllBrandResponse)=>(
          <tr key={brand.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-1">
                {brand.name}
                </td>
                <td className="">
              <button className="px-2 rounded-md bg-sidebar text-gray-100">
              <FontAwesomeIcon icon={faPen} />
              </button>
            </td>
            <td className="">
              <button className="px-2 rounded-md bg-red-700 text-gray-100" 
              onClick={() => handleDeleteBrand(brand.id)}>
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

export default Brand;