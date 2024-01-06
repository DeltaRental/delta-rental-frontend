import React, { useEffect, useState } from "react";
import CarService from "../services/carService";
import { Link } from "react-router-dom";
import { CarModel } from "../model/CarModel";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/actions/cartActions";
import toast, { ToastBar, Toaster } from "react-hot-toast";

const CarList = () => {
  const [cars, setCars] = useState<CarModel[]>([]);
  const dispatch = useDispatch(); // çalıştıracağın fonksiyonu bunula çekiyorsun.

  useEffect(() => {
    let carService = new CarService();
    carService.getProducts().then((result) => setCars(result.data));
  }, []);

  const handleAddToCart = (car: CarModel) => {
    dispatch(addToCart(car));
    toast("Araç sepete eklendi.", {
      duration: 4000,
      position: "bottom-right",
      style: {},
      className: "bg-success text-light",
      icon: "👏",

    })};

  return (
    <>
      <Toaster />

      <div className="table-responsive text-center">
        <table className="table table-striped table-hover table-bordered border-black">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Plate</th>
              <th scope="col">Model Name</th>
              <th scope="col">Color</th>
              <th scope="col">Kilometer</th>
              <th scope="col">Year</th>
              <th scope="col">Daily Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <Link to={`/cars/${car.id}`}>{car.plate}</Link>
                </td>
                <td>{car.modelName}</td>
                <td>{car.colorName}</td>
                <td>{car.kilometer}</td>
                <td>{car.year}</td>
                <td>{car.dailyPrice}</td>
                <td>
                  <button
                    id="liveToastBtn"
                    onClick={() => handleAddToCart(car)}
                    className="btn btn-success"
                  >
                    Sepete Ekle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CarList;
