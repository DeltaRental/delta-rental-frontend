import { useState } from "react";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import toast from "react-hot-toast";
import ReactCardFlip from "react-card-flip"; // Import React Card Flip
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faCalendarAlt,
  faGasPump,
  faCogs,
  faPalette,
  faSyncAlt,
  faCity,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import "./CarList.css";

const CarCard = ({ car }: { car: GetAllCarResponse }) => {
  const [isFlipped, setIsFlipped] = useState(false); // Define a state for flipping

  const handleAddToCart = (car: GetAllCarResponse) => {
    toast("Araç sepete eklendi.", {
      duration: 4000,
      position: "bottom-right",
      style: {},
      className: "bg-success text-light",
      icon: "👏",
    });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Flip the card
  };

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="card-front relative bg-white shadow-lg rounded-lg overflow-hidden max-h-[400px]">
        <div className="p-4">
          <img
            className="w-full h-48 object-cover card-front-img"
            src="https://www.avis.com.tr/Avis/media/Avis/Cars/n-citroen-c-elysee.png"
            alt={`${car.model.brandName} ${car.model.name}`}
          />
          <FontAwesomeIcon
            icon={faSyncAlt}
            className="absolute right-2 top-2 text-gray-500 text-3xl cursor-pointer"
            onClick={handleFlip}
          />
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
              {car.model.brandName} {car.model.name}
            </h3>
            <p className="text-gray-600 flex items-center">
            <img className="w-7 h-7 object-cover mr-2" src="https://www.svgrepo.com/show/232243/license-plate.svg" alt="Plaka" />
              {car.plate}
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faCity}
                className="mr-2 text-purple-500  w-7 h-7"
                size="lg"
              />
              İstanbul
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-2 text-orange-500 w-7 h-7"
                size="lg"
              />
              Büyükçekmece
            </p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-lg font-bold text-blue-600">
                  {car.dailyPrice} TL
                </p>
                <p className="text-xs text-gray-600">Günlük Kiralama Ücreti</p>
              </div>
              <button
                onClick={() => handleAddToCart(car)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Hemen Kirala
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card-back relative bg-gray-100 shadow-lg rounded-lg overflow-hidden min-h-[400px] flex flex-col justify-between">
        <div className="p-4">
          <FontAwesomeIcon
            icon={faSyncAlt}
            className="absolute right-2 top-2 text-gray-500 text-3xl cursor-pointer"
            onClick={handleFlip}
          />
          <div className="mt-3 gap-y-3 grid">
            <h3 className="text-lg font-semibold text-gray-800">
              Araç Detayları
            </h3>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faGasPump}
                className="mr-2 text-red-500 w-7 h-7"
                size="lg"
              />
              {car.fuelType}
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faCogs}
                className="mr-2 text-yellow-500 w-7 h-7"
                size="lg"
              />
             {car.gearType}
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faPalette}
                className="mr-2 text-pink-500 w-7 h-7"
                size="lg"
              />
              {car.color.name}
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faCar}
                className="mr-2 text-blue-500 w-7 h-7"
                size="lg"
              />
              Başlangıç KM: {car.kilometer}
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mt-3">
            <div>
              <p className="text-lg font-bold text-blue-600">
                {car.dailyPrice} TL
              </p>
              <p className="text-xs text-gray-600">Günlük Kiralama Ücreti</p>
            </div>
            <button
              onClick={() => handleAddToCart(car)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Hemen Kirala
            </button>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default CarCard;
