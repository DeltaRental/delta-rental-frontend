import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarService from "../services/carService";
import { CarModel } from "../model/CarModel";

const CarDetail = () => {
  let { id } = useParams();

  const [car, setCar] = useState<CarModel>();

  useEffect(() => {
    let carService = new CarService();
    carService.getByCarId(id).then((result) => setCar(result.data));
  }, []);

  return (
    <div>
      <div className="card w-100">
        <img src="https://img.autoabc.lv/opel-vectra/opel-vectra_1995_Hecbeks_221545517_17.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{car?.modelName}</h5>
          <p className="card-text">
            <div>
              <ul className="list-unstyled">
                <li>Araç Plakası: {car?.plate}</li>
                <li>Araç Rengi: {car?.colorName}</li>
                <li>Araç Kilometresi: {car?.kilometer}</li>
                <li>Araç Yılı: {car?.year}</li>
                <li>Araç Günlük Kira Ücreti: {car?.dailyPrice}</li>
              </ul>
            </div>
          </p>
          <a href="#" className="btn btn-success me-3">
            Sepete Ekle
          </a>
          <a href="#" className="btn btn-danger">
            Favoriye Ekle
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
