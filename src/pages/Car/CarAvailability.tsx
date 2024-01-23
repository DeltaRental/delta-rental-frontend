import React, { useEffect, useState } from 'react'
import CarService from '../../services/carService'
import { CarModel } from '../../model/CarModel';
import toast, { Toaster } from 'react-hot-toast';
import { addToCart } from '../../store/actions/cartActions';
import { useDispatch } from 'react-redux';
import CarList from './CarList';

type Props = {
    
}

const CarAvailability = (props: Props) => {


    return (
        <div>Car Availability</div>
    );
}

export default CarAvailability