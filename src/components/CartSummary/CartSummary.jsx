import React from "react";
import { Link } from "react-router-dom";

const CartSummary = () => {
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
          <a href="#" className="dropdown-item">
            BMW
          </a>
          <a href="#" className="dropdown-item">
            Mercedes
          </a>
          <a href="#" className="dropdown-item">
            Audi
          </a>
          <li>
            <hr className="dropdown-divider" />
          </li>
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
