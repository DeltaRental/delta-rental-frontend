import { CarModel } from "../../model/CarModel";

export interface CartItems {
  cartItems: {
    quantity: number;
    car: CarModel;
  }[];
}

export const cartItems:CartItems['cartItems']=[]