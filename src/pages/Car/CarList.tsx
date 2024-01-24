import React, { useEffect, useState } from "react";
import CarService from "../../services/carService";
import { Link } from "react-router-dom";
import { CarModel } from "../../model/CarModel";
import { useDispatch } from "react-redux";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const CarList = () => {
  const [cars, setCars] = useState<CarModel[]>([]);
  const dispatch = useDispatch(); // çalıştıracağın fonksiyonu bunula çekiyorsun.
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCarList();
  },[])
  
  
  const fetchCarList = async() => {
    setLoading(false);
    let carService = new CarService();
    let response = await carService.getAll();
    setCars(response.data);
  }


  const handleAddToCart = (car: CarModel) => {
    toast("Araç sepete eklendi.", {
      duration: 4000,
      position: "bottom-right",
      style: {},
      className: "bg-success text-light",
      icon: "👏",

    })};

  return (
    
      <div className="container mx-auto">
        <div className="flex justify-center flex-wrap">
         <Toaster />
      {loading && <div>Yükleniyor...</div>}
                  {
        cars.map((car)=>(
          <div key={car.id} className=' rounded-lg w-96 shadow-lg shadow-blue-300/50 m-4 cursor-pointer hover:bg-blue-100 active:bg-blue-100'>
            <img className='w-80  items-center' src="https://www.avis.com.tr/Avis/media/Avis/Cars/n-citroen-c-elysee.png" alt="" />
            <button
                    id="liveToastBtn"
                    onClick={() => handleAddToCart(car)}
                    className="btn btn-success"
                  >
                    Hemen Kirala
                  </button>
          <div  className='w-80 items-center flex justify-between'>
            <div className='order-first p-2'>
             <p>Araç Özellikleri</p>
            <ul>
              <li>{car.modelName}</li>
              
              <li>{car.plate}</li>
              <li>{car.colorName}</li>
             </ul>
             </div>
             <div className='order-last p-2'>
              <p>Kiralama Koşulları</p>
             <ul>
              <li>{car.dailyPrice}</li>
              <li>{car.kilometer}</li>
              <li>{car.year} </li>
             </ul>
            </div>
          </div>
        </div>
         ))
      }
      </div>
      </div>
    
  );
};

export default CarList;
