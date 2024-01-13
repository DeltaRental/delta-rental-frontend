import React, { useState } from "react";
import CartSummary from "../CartSummary/CartSummary";
import SignedOut from "../SignedOut/SignedOut";
import SignedIn from "../SignedIn/SignedIn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faUserCircle } from "@fortawesome/free-regular-svg-icons";

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
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <div>
     <nav className="container p-3 mx-auto md:p-6 lg:p-8 xl:p-10 ">
  <div className="flex items-center justify-between flex-row-reverse">
    <FontAwesomeIcon
      className={`w-7 h-7 md:hidden cursor-pointer transition-transform transform ${isMenuOpen ? 'rotate-0' : 'rotate-180'}`}
      icon={isMenuOpen ? faTimes : faBars}
      onClick={toggleMenu}
    />
    <div className="md:hidden p-1 border-2 border-black border-dotted rounded-full">
      <img
        className="md:mx-auto w-12 h-12 rounded-full"
        src="https://avatars.githubusercontent.com/u/156099996?s=200&v=4"
        alt="logo_4"
        data-ezsrc="/static_files/images/logos/logo_4.png?ezimgfmt=rs:112x83/rscb1/ngcb1/notWebP"
      />
    </div>
  </div>
  <div className={`md:block ${isMenuOpen ? 'block' : 'hidden'}`} id="menu">
    <div className="grid grid-cols-1 md:grid-cols-9 ">
      <div className="col-span-4 text-base lg:text-lg md:border-y border-y-black">
        <ul className="justify-between lg:p-4 p-2 md:flex ">
          <li className="p-2 py-4 border-b md:py-0 md:border-0">
            <a href="#">Home</a>
          </li>
          <li className="p-2 py-4 border-b md:py-0 md:border-0">
            <a href="#">Products</a>
          </li>
          <li className="p-2 py-4 border-b md:py-0 md:border-0">
            <a href="#">Pricing</a>
          </li>
        </ul>
      </div>
      <div className="hidden md:block relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-1 border-2 border-black border-dotted rounded-full">
            <img
              className="md:mx-auto w-14 h-14 lg:w-20 lg:h-20 xl:w-28 xl:h-28 rounded-full"
              src="https://avatars.githubusercontent.com/u/156099996?s=200&v=4"
              alt="logo_4"
              data-ezsrc="/static_files/images/logos/logo_4.png?ezimgfmt=rs:112x83/rscb1/ngcb1/notWebP"
            />
          </div>
        </div>
      </div>
      <div className="col-span-4 md:border-y border-y-black">
        <ul className="justify-between text-base lg:text-lg p-2 lg:p-4 md:flex">
          <li className="p-2 py-4 border-b md:py-0 md:border-0">
            <a href="#">Company</a>
          </li>
          <li className="p-2 py-4 border-b md:py-0 md:border-0">
            <a href="#">Services</a>
          </li>
          <li className="p-2 py-4 border-b md:py-0 md:border-0">
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

      {/* <header className="bg-cyan-100">
        <div className="container mx-auto px-2 py-2 flex items-center">
          <div className="mr-auto md:w-48 flex-shrink-0 ">
            <img
              className="h-8 md:h-24 border border-green-700 rounded-full"
              src="https://avatars.githubusercontent.com/u/156099996?s=200&v=4"
              alt=""
            />
          </div>

          <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
            <select
              className="bg-transparent uppercase font-bold text-sm p-4 mr-4"
              name=""
              id=""
            >
              <option>all categories</option>
            </select>
            <input
              className="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4"
              type="text"
              placeholder="I'm searching for ..."
            />
            <FontAwesomeIcon
              className="ml-auto h-5 px-4 text-gray-500 svg-inline--fa fa-search fa-w-16 fa-9x"
              icon={faMagnifyingGlass}
            />
          </div>

          <div className="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
            <span className="font-bold md:text-xl">8 800 332 65-66</span>
            <span className="font-semibold text-sm text-gray-400">
              Support 24/7
            </span>
          </div>

          <nav className="contents">
            <ul className="ml-4 xl:w-48 flex items-center justify-end">
              <li className="ml-2 lg:ml-4 relative inline-block">
                <a className="" href="">
                  <FontAwesomeIcon
                    className="h-9 lg:h-7 p-2 text-gray-500 svg-inline--fa fa-user fa-w-14 fa-9x"
                    icon={faUserCircle}
                  />
                </a>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <a className="" href="">
                  <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                    3
                  </div>
                  <FontAwesomeIcon
                    className="h-9 lg:h-7 p-2 text-gray-500 svg-inline--fa fa-heart fa-w-16 fa-9x"
                    icon={faHeart}
                  />
                </a>
              </li>
              <li className="ml-2 lg:ml-4 relative inline-block">
                <CartSummary/>
              </li>
            </ul>
          </nav>

          <div className="ml-4 hidden sm:flex flex-col font-bold">
            <span className="text-xs text-gray-400">Your Cart</span>
            <span>$2,650,59</span>
          </div>
        </div>

        <hr />
      </header> */}
      {/* <nav
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
      </nav> */}
    </div>
  );
};

export default Navi;
