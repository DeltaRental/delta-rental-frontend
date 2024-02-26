import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "../../components/CustomLink/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCity,
  faCogs,
  faGasPump,
  faGaugeHigh,
  faGaugeSimple,
  faGaugeSimpleHigh,
  faGears,
  faLocationDot,
  faPalette,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { AppDispatch } from "../../store/store";
import { getRentalByUser } from "../../store/slices/rentalSlice";
import rentalService from "../../services/rentalService";
import { GetAllRentalResponse } from "../../models/rentals/response/GetAllRentalResponse";
import RentalListByUser from "../../components/RentalListByUser/RentalListByUser";

type Props = {};

function Rentals({}: Props) {
  const userState = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    if (userState.users.id) {
      rentalService.getRentalByUser(userState.users.id).then(
        (response) => {
          console.log(response);
          setRentals(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [userState.users.id]);

  return (
    <div className="">
      <h3 className="text-lg font-bold  text-gray-900 dark:text-white mb-2">
        {`Merhaba ${userState.users.name} ${userState.users.surname}`}
      </h3>
      <p className="mb-2">
        Bu sayfadan geçmiş siparişlerini görüntüleyebilirsin.
      </p>
      <hr />
      {rentals.length > 0 ? (
        rentals.map((rental: any) => (
          <RentalListByUser key={rental.id} rental={rental} />
        ))
      ) : (
        <div>
          <div className="flex justify-center mt-10 font-bold text-xl">
            <p>Siparişiniz bulunmamaktadır.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rentals;
