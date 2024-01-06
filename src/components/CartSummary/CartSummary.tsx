import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const { cartItems } = useSelector((state:any) => state.cart);

  return (
    <div>
      <div className="nav-item dropdown navbar-nav">
        <a
          href="#"
          className="nav-link dropdown-toggle "
          data-bs-toggle="dropdown"
        >
          Sepet
        </a>
        <div className="dropdown-menu">
          {cartItems.map((cartItem:any,index:number) => (
            <a key={index} href="#" className="dropdown-item">
              {cartItem.car.modelName}
              <span className="badge bg-primary rounded-pill ms-3">{cartItem.quantity}</span>
            </a>
          ))}
          <li>
            <Link to={"/cart"} className="dropdown-item">
              Sepete Git
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
