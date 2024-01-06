import React, { useState } from "react";
import CartSummary from "../CartSummary/CartSummary";
import SignedOut from "../SignedOut/SignedOut";
import SignedIn from "../SignedIn/SignedIn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navi = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { cartItems } = useSelector((state: any) => state.cart);

  const navigate = useNavigate();

  function handleSignOut() {
    setIsAuthenticated(false);
    navigate("/");
  }

  function handleSignIn() {
    setIsAuthenticated(true);
  }

  return (
    <div>
      <nav
        className="navbar bg-dark navbar-expand-lg sticky-top"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            RENT
          </Link>
          <button
            type="button"
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div className="navbar-nav">
              <Link to={"/car/add"} className="nav-item nav-link">
                Add Car
              </Link>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Messages
                </a>
                <div className="dropdown-menu">
                  <a href="#" className="dropdown-item">
                    Inbox
                  </a>
                  <a href="#" className="dropdown-item">
                    Sent
                  </a>
                  <a href="#" className="dropdown-item">
                    Drafts
                  </a>
                </div>
              </div>
            </div>
            <form className="d-flex">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
                <button type="button" className="btn btn-secondary">
                  <i className="bi-search"></i>
                </button>
              </div>
            </form>
            {cartItems.length > 0 && <CartSummary />}
            <div className="d-flex flex-row align-items-center">
              {isAuthenticated ? (
                <SignedIn signOut={handleSignOut} />
              ) : (
                <SignedOut signIn={handleSignIn} />
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navi;
