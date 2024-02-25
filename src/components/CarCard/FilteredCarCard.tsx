import { useState } from "react";
import { GetAllCarResponse } from "../../models/cars/response/getAllCarResponse";
import toast from "react-hot-toast";
import ReactCardFlip from "react-card-flip"; // Import React Card Flip
import "./CarList.css";
import Link from "../CustomLink/Link";
import { AppDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCar } from "../../store/slices/carListSlice";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
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

type Props = {};

function FilteredCarCard({ car }: { car: GetAllCarResponse }) {
  const dispatch = useDispatch<AppDispatch>();
  const rentalState = useSelector((state: any) => state.rental);

  const [isFlipped, setIsFlipped] = useState(false); // Define a state for flipping
  const location = useLocation();

  const handleAddToCart = (car: GetAllCarResponse) => {
    toast("Araç sepete eklendi.", {
      duration: 4000,
      position: "bottom-right",
      style: {},
      className: "bg-success text-light",
      icon: "👏",
    });
  };
  let parsedDate = dayjs(rentalState.selectedEndDate);
  //console.log((dayjs(rentalState.selectedEndDate).diff(dayjs(rentalState.selectedStartDate),'day')));

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Flip the card
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="card-front relative rounded-lg overflow-hidden max-h-[400px]">
        <div className="p-4">
          <img
            className="w-full h-48 object-cover card-front-img"
            src="https://www.avis.com.tr/Avis/media/Avis/Cars/n-citroen-c-elysee.png"
            alt={`${car.model.brandName} ${car.model.name}`}
          />
          <FontAwesomeIcon
            icon={faSyncAlt}
            className="absolute right-2 top-2 text-delta-green-1000 text-3xl cursor-pointer"
            onClick={handleFlip}
          />
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center">
              {car.model.brandName} {car.model.name}
            </h3>
            <p className="text-gray-600 flex items-center">
              <img
                className="w-7 h-7 object-cover mr-2"
                src="https://www.svgrepo.com/show/232243/license-plate.svg"
                alt="Plaka"
              />
              {car.plate}
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faCity}
                className="mr-2 text-purple-500  w-7 h-7"
                size="lg"
              />
              {car.branch.city}
            </p>
            <p className="text-gray-600 flex items-center">
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-2 text-orange-500 w-7 h-6 "
                size="lg"
              />
              {car.branch.name}
            </p>
            <div className="flex items-center justify-between mt-3">
              <div>
                <p className="text-lg font-bold text-delta-green-1200">
                  {car.dailyPrice *
                    dayjs(rentalState.selectedEndDate).diff(
                      dayjs(rentalState.selectedStartDate),
                      "day"
                    )}{" "}
                  TL
                </p>
                <p className="text-xs text-gray-600">Toplam Kiralama Ücreti</p>
              </div>
              {localStorage.getItem("jsonwebtoken") != null ? (
                <Link to={"/payment"}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(car));
                      handleAddToCart(car);
                    }}
                    className="bg-delta-green-1000 hover:bg-delta-green-600 text-white hover:text-black px-4 py-2 rounded-lg"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              ) : (
                <Link to={"/login"} state={{ from: location }}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(car));
                      handleAddToCart(car);
                    }}
                    className="bg-delta-green-1000 hover:bg-delta-green-600 text-white hover:text-black px-4 py-2 rounded-lg"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CARD - BACK */}

      <div className="card-back relative rounded-lg overflow-hidden min-h-[400px] flex flex-col justify-between">
        <div className="p-4">
          <FontAwesomeIcon
            icon={faSyncAlt}
            className="absolute right-2 top-2 text-delta-green-1000 text-3xl cursor-pointer"
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
              <p className="text-lg font-bold text-delta-green-1200">
                {car.dailyPrice *
                  dayjs(rentalState.selectedEndDate).diff(
                    dayjs(rentalState.selectedStartDate),
                    "day"
                  )}{" "}
                TL
              </p>
              <p className="text-xs text-gray-600">Toplam Kiralama Ücreti</p>
            </div>
            {localStorage.getItem("jsonwebtoken") != null ? (
              <Link to={"/payment"}>
                <button
                  id="liveToastBtn"
                  onClick={() => {
                    dispatch(setSelectedCar(car));
                    handleAddToCart(car);
                  }}
                  className="bg-delta-green-1000 hover:bg-delta-green-600 text-white hover:text-black px-4 py-2 rounded-lg"
                >
                  Hemen Kirala
                </button>
              </Link>
            ) : (
              <Link to={"/login"} state={{ from: location }}>
                <button
                  id="liveToastBtn"
                  onClick={() => {
                    dispatch(setSelectedCar(car));
                    handleAddToCart(car);
                  }}
                  className="bg-delta-green-1000 hover:bg-delta-green-600 text-white hover:text-black px-4 py-2 rounded-lg"
                >
                  Hemen Kirala
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </ReactCardFlip>
  );
}

export default FilteredCarCard;
