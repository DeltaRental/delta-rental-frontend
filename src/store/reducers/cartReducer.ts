import { ADD_TO_CART, REMOVE_FROM_CART } from './../actions/cartActions';
import { cartItems } from './../initialValues/cartItems';


const initialState = {
  cartItems: cartItems
}


const cartReducer  = (state=initialState, {type,payload}:any ) => {
  switch (type) {
    case ADD_TO_CART:
      let car = state.cartItems.find(c=>c.car.id === payload.id)     
      
      if (car) {
        car.quantity++;
        return{
          ...state
        }
      } else {
        return{
          cartItems:[...state.cartItems,{quantity:1, car:payload}]        
        }
      }
      
    case REMOVE_FROM_CART:
      return{
        ...state,
        cartItems:state.cartItems.filter(c=>c.car.id !== payload.id)
      }
  
    default:
      return state;
  }
}

export default cartReducer;