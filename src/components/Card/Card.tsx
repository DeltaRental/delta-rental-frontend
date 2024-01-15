import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import CarService from "../services/carService.ts";
//import  {CarModel}  from "../model/CarModel";

import "./Card.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser, faSuitcase, faGasPump, faIdCard,faCreditCard } 
from '@fortawesome/free-solid-svg-icons';
const Card= () =>{
  
    // let { id } = useParams();
  
    // const [car, setCar] = useState<CarModel>();
  
    // useEffect(() => {
    //   let carService = new CarService();
    //   carService.getByCarId(id).then((result) => setCar(result.data));
    // }, []);
  
  return (
    <div className="">
      <div className="card">
        <div className="front">
          <ul className="head">
            <li>
              <h4>Renault Clio</h4>
            </li>
            <li>
              <button className="button">Hemen Kirala</button>
            </li>
          </ul>
          <img
            className="image"
            src="https://www.avis.com.tr/Avis/media/Avis/Cars/f-fiat-egea-hb.png"
          />
          <div className="footer-left">
            <ul className="item">
              <li>
                <b>Araç Özellikleri</b>
              </li>
                <li>
                <FontAwesomeIcon icon={faCircleUser} />
                  4 Kişilik</li>
              <li>
              <FontAwesomeIcon icon={faSuitcase} />
                2 büyük bavul</li>
              <li>
              <FontAwesomeIcon icon={faGasPump} />
                Dizel/benzin</li>
            </ul>
          </div>
          <div className="footer-right">
            <ul className="item">
              <li>
                <b>Kiralama Koşulları</b>
              </li>
              <li>21 yaş ve üstü</li>
              <li>
              <FontAwesomeIcon icon={faIdCard} />
                Ehliyet yaşı</li>
              <li>
              <FontAwesomeIcon icon={faCreditCard} />
                Ödeme Yöntemi</li>
            </ul>
          </div>
        </div>
        <div className="back">Back</div>
      </div>
    </div>
  );
}

export default Card;
