import { CarModel } from "../../model/CarModel"

export const ADD_TO_CART = "ADD_TO_CART"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"


export const addToCart = (car:CarModel) => {
  return{
    type: ADD_TO_CART,
    payload: car
  }
}

export const removeFromCart = (car:CarModel) => {
  return{
    type: REMOVE_FROM_CART,
    payload:car
  }
}