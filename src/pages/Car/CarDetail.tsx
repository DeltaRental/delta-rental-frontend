import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarService from "../../services/carService";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import carService from "../../services/carService";

const CarDetail = () => {
  let {id} = useParams();

  const [car, setCar] = useState<GetAllCarResponse>();

  // useEffect(() => {
  //   // setCar(result.data)
  //   carService.getById(id).then((result) => console.log(result));
  // }, []);

  return (
    <div>
      <div className="card w-100 text-center">
        <img
          src="https://img.autoabc.lv/opel-vectra/opel-vectra_1995_Hecbeks_221545517_17.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{car?.model.brandName}</h5>
          <p className="card-text">
            <div>
              <ul className="list-unstyled">
                <li>Araç Plakası: {car?.plate}</li>
                <li>Araç Modeli:{car?.model.name} </li>
                <li>Araç Rengi: {car?.color.name}</li>
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
