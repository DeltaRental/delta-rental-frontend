import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { deleteBranch, fetchBranches } from '../../../store/slices/branchSlice';
import { GetAllBranchResponse } from '../../../models/branches/response/getAllBranchResponse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type Props = {}

const Branches = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const branchState = useSelector((state: any)=> state.branch);
  useEffect(()=>{
    dispatch(fetchBranches())
  }, [dispatch]);

  const handleDeleteBranch = async (branchId: number) => {
    try {
      await dispatch(deleteBranch({ id: branchId }));
      dispatch(fetchBranches());
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  return (
    <div className="relative overflow-x-auto rounded-lg shadow-xl shadow-gray-400 mt-6">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 ">
        <thead className="text-sm uppercase bg-sidebar text-gray-200">
          <tr>
            <th scope="col" className="px-2 py-1">Ofis</th>
            <th scope="col" className="px-2 py-1">Adres</th>
            <th scope="col" className="px-2 py-1">Telefon</th>
            <th scope="col" className="px-2 py-1">E-mail</th>
            <th scope="col" className="px-2 py-1">Yönetici Adı</th>
            <th scope="col" className="px-2 py-1">Şehir</th>
            <th scope="col" className="px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          
          {branchState.branches.map((branch: GetAllBranchResponse)=>(
          <tr key={branch.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-2 py-1">
                {branch.name}</td>
              <td className="px-2 py-1">{branch.address}</td>
              <td className="px-2 py-1">{branch.gsm} </td>
              <td className="px-2 py-1">{branch.email} </td>
              <td className="px-2 py-1">{branch.managerName} </td>
              <td className="px-2 py-1">{branch.city}</td>
            <td className="">
              <button className="px-2 rounded-md bg-red-700 text-gray-100" 
              onClick={() => handleDeleteBranch(branch.id)}>
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

export default Branches