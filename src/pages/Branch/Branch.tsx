import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchCars } from '../../store/slices/carListSlice';
import { fetchBranches } from '../../store/slices/branchSlice';
import { GetAllBranchResponse } from '../../models/branches/response/getAllBranchResponse';




{/* <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
   <li className="pb-3 sm:pb-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
         <div className="flex-shrink-0">
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
         </div>
         <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               Neil Sims
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               email@flowbite.com
            </p>
         </div>
         <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            $320
         </div>
      </div>
   </li>
</ul> */}


const Branch = () => {
    const branchesState = useSelector((state: any) => state.branch);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBranches());
    }, [dispatch]);

    console.log(branchesState);



    return (
<div className="container mx-auto pt-24 pb-24">
  <div className="flex justify-center items-center flex-grow">
    <div className="m-3 w-[49rem] h-[38rem] text-white rounded-lg bg-delta-green-600 shadow-lg overflow-y-auto">
      <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400 p-4">

        {branchesState.branches.map((branch: GetAllBranchResponse) => (
          <li className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div key={branch.id} className="sube mt-3 mb-3">
              <h1 className="xl:text-3xl text-3xl pb-4 text-delta-green-1200 font-bold">{branch.city}</h1>
              <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                <p><strong className="pl-4 text-delta-green-1000 text-base" >Telefon:</strong>{branch.gsm}</p>
                <p><strong className="pl-4 text-delta-green-1000 text-base" >Mail:</strong> {branch.email}</p>
                <p ><strong className="pl-4 text-delta-green-1000 text-base" >Semt:</strong> {branch.name}</p>
              </ol>
              
            </div>
            <div className="flex flex-col justify-center items-center">
              <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                <p>Hafta içi : 08.00 - 19.00</p>
                <p>Hafta sonu : 10.00 - 18.00</p>
              </ol>
              
            </div>
            
          </li>
        ))}



      </ul>
    </div>
  </div>
</div>







    )
}

export default Branch;