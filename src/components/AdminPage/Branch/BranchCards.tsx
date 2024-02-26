import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../../store/slices/branchSlice';
import { AppDispatch } from '../../../store/store';
import { fetchCars } from '../../../store/slices/carListSlice';
import { brandList } from '../../../store/slices/brandSlice';
import CircularProgressBar from '../../CircleProgressBar';

const AdminStatisticsCard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const branchState = useSelector((state: any) => state.branch);
  const brandState = useSelector((state: any) => state.brand);
  const carState = useSelector((state: any) => state.car);
  
  useEffect(() => {
    dispatch(fetchBranches());
    dispatch(fetchCars());
    dispatch(brandList());
  }, [dispatch]);

  return (
    <div className="rounded-lg p-6 mt-6 mb-6">
      <h2 className="text-lg text-delta-green-1000 font-semibold mb-4 text-center">Admin İstatistikleri</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100  shadow-lg shadow-delta-green-600 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="text-delta-green-800 font-semibold ml-4">Şubeler</h3>
            <p className="text-3xl text-delta-green-800 ml-4">{branchState.branches.length}</p>
          </div>
          {/* Dairesel çubuk */}
          <div className="relative w-20 h-20 ">
            <CircularProgressBar progress={50} strokeWidth={5} circleSize={50} circleColor="#ADBC9F" progressColor="#436850" />
          </div>
        </div>
        {/* İkinci istatistik */}
        <div className="bg-gray-100  shadow-lg shadow-delta-green-600 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="text-delta-green-800 font-semibold ml-4">Markalar</h3>
            <p className="text-3xl text-delta-green-800 ml-4">{brandState.brands.length}</p>
          </div>
          {/* Dairesel çubuk */}
          <div className="relative w-20 h-20">
            <CircularProgressBar progress={75} strokeWidth={5} circleSize={50} circleColor="#ADBC9F" progressColor="#436850" />
          </div>
        </div>
        {/*Üçüncü istatistik */}
        <div className="bg-gray-100 rounded-lg  shadow-lg shadow-delta-green-600 p-4 flex items-center justify-between">
          <div>
            <h3 className="text-delta-green-800 font-semibold ml-4">Araçlar</h3>
            <p className="text-3xl text-delta-green-800 ml-4">{carState.cars.length}</p>
          </div>
          {/* Dairesel çubuk */}
          <div className="relative w-20 h-20">
            <CircularProgressBar progress={25} strokeWidth={5} circleSize={50} circleColor="#ADBC9F" progressColor="#436850" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStatisticsCard;
