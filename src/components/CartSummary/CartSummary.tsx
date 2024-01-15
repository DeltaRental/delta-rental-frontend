import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div className="relative inline-block text-left">
        <div>
          <button onClick={() => setToggle(!toggle)} className="">
            {cartItems.length > 0 && (
              <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                {cartItems.length}
              </div>
            )}
            <div>
              <FontAwesomeIcon
                className="h-9 lg:h-7 p-2 text-gray-500 svg-inline--fa fa-shopping-cart fa-w-18 fa-9x"
                icon={faCar}
              />
            </div>
          </button>
        </div>

        {toggle && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              {cartItems.map((cartItem: any, index: number) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                >
                  {cartItem.car.modelName}
                  <span className="badge bg-primary rounded-pill ms-3">
                    {cartItem.quantity}
                  </span>
                </a>
              ))}
              <li>
                <Link to={"/cart"} className="text-gray-700 block px-4 py-2 text-sm">
                  Sepete Git
                </Link>
              </li>
            </div>
          </div>
        )}
      </div>

      {/* <div className="nav-item dropdown navbar-nav">
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
      </div> */}
    </div>
  );
};

export default CartSummary;
