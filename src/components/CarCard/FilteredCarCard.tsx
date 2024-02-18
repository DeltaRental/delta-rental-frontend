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

type Props = {
  car: GetAllCarResponse
}

function FilteredCarCard(props: Props) {
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
  console.log((dayjs(rentalState.selectedEndDate).diff(dayjs(rentalState.selectedStartDate),'day')));
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Flip the card
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div className="flip-card-inner card-front" onClick={handleFlip}>
        <div className="h-[340px]">
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src="https://www.avis.com.tr/Avis/media/Avis/Cars/n-citroen-c-elysee.png"
            alt=""
          />
          <div className="p-4 justify-between flex-grow ">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {props.car.model.brandName} {props.car.model.name}
              </h3>
              <p className="text-sm text-gray-600">
                {props.car.plate} - {props.car.color.name}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-lg font-bold text-blue-600">
                  {props.car.dailyPrice * (dayjs(rentalState.selectedEndDate).diff(dayjs(rentalState.selectedStartDate),'day'))} TL
                </p>
                <p className="text-sm text-gray-600">Günlük Kiralama Ücreti</p>
              </div>
              {localStorage.getItem("jsonwebtoken") != null ? (
                <Link to={"/payment"}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(props.car));
                      handleAddToCart(props.car);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              ) : (
                <Link to={"/login"} state={{ from: location }}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(props.car));
                      handleAddToCart(props.car);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flip-card-inner card-back" onClick={handleFlip}>
        <div className="h-[340px]">
          <div className="p-4 flex flex-col justify-between flex-grow ">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Araç Detayları
              </h3>
              <p className="text-sm text-gray-600">Model Yılı: {props.car.year}</p>
              <p className="text-sm text-gray-600">
                Yakıt Tipi: {props.car.fuelType}
              </p>
              <p className="text-sm text-gray-600">
                Vites Tipi: {props.car.gearType}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-lg font-bold text-blue-600">
                  {props.car.dailyPrice} TL
                </p>
                <p className="text-sm text-gray-600">Günlük Kiralama Ücreti</p>
              </div>
              {localStorage.getItem("jsonwebtoken") != null ? (
                <Link to={"/payment"}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(props.car));
                      handleAddToCart(props.car);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              ) : (
                <Link to={"/login"} state={{ from: location }}>
                  <button
                    id="liveToastBtn"
                    onClick={() => {
                      dispatch(setSelectedCar(props.car));
                      handleAddToCart(props.car);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Hemen Kirala
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReactCardFlip>
  )
}

export default FilteredCarCard