import React, { useState } from "react";
import CartSummary from "../CartSummary/CartSummary";
import SignedOut from "../SignedOut/SignedOut";
import SignedIn from "../SignedIn/SignedIn";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faUserCircle } from "@fortawesome/free-regular-svg-icons";

type DropdownStates = {
  services: boolean;
  contactUs: boolean;
  // Diğer dropdownlar eklenebilir
};

const Navi = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { cartItems } = useSelector((state: any) => state.cart);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    services: false,
    contactUs: false,
  });

  const navigate = useNavigate();

  function handleSignOut() {
    setIsAuthenticated(false);
    navigate("/");
  }

  function handleSignIn() {
    setIsAuthenticated(true);
  }

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleToggleDropdown = (dropdownName: keyof DropdownStates) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <div className="bg-red-600">
      <nav className="container p-3 mx-auto md:p-6 lg:p-8 xl:p-10 ">
        <div className="flex items-center justify-between flex-row-reverse">
          <FontAwesomeIcon
            className={`w-7 h-7 md:hidden cursor-pointer transition-transform transform ${
              isMenuOpen ? "rotate-0" : "rotate-180"
            }`}
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
        <div
          className={`md:block ${isMenuOpen ? "block" : "hidden"}`}
          id="menu"
        >
          <div className="grid grid-cols-1 md:grid-cols-9 ">
            <div className="col-span-4 text-base lg:text-lg md:border-y border-y-black">
              <ul className="justify-between md:flex ">
                <li className="p-2 py-4 lg:p-4 border-b  md:border-0">
                  <a href="#">Home</a>
                </li>
                <li className="p-2 py-4 lg:p-4 border-b  md:border-0">
                  <a href="#">Products</a>
                </li>
                <li className="p-2 py-4 lg:p-4 border-b  md:border-0">
                  <a href="#">Pricing</a>
                </li>
              </ul>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1 border-2 border-black border-dotted rounded-full">
                  <img
                    className="md:mx-auto w-14 h-14 lg:w-20 lg:h-20 xl:w-28 xl:h-28 rounded-full "
                    src="https://avatars.githubusercontent.com/u/156099996?s=200&v=4"
                    alt="logo_4"
                    data-ezsrc="/static_files/images/logos/logo_4.png?ezimgfmt=rs:112x83/rscb1/ngcb1/notWebP"
                  />
                </div>
              </div>
            </div>
            <div className=" col-span-4 md:border-y border-y-black">
              <ul className="justify-between text-base lg:text-lg  md:flex">
                <li className="p-2 py-4 lg:p-4 border-b  md:border-0">
                  <a href="#">Company</a>
                </li>

                <div
                  className="relative hover:bg-white hover:text-red-600"
                  onMouseEnter={() => handleToggleDropdown("services")}
                  onMouseLeave={() => handleToggleDropdown("services")}
                >
                  <li className="p-2 py-4 lg:p-4 border-b md:border-0">
                    <a href="#">Services</a>
                    {dropdownStates.services && (
                      <div className="md:absolute bg-white left-0 z-10 top-[57px] lg:top-[60px] md:w-[200px] shadow-md">
                        <div className="cursor-pointer p-4 text-black hover:text-red-600 hover:bg-gray-300">
                          Settings
                        </div>
                        <div className="cursor-pointer p-4 text-black hover:text-red-600 hover:bg-gray-300">
                          User
                        </div>
                        <div className="cursor-pointer p-4 text-black hover:text-red-600 hover:bg-gray-300">
                          Class
                        </div>
                      </div>
                    )}
                  </li>
                </div>

                <div
                  className="relative hover:bg-white hover:text-red-600"
                  onMouseEnter={() => handleToggleDropdown("contactUs")}
                  onMouseLeave={() => handleToggleDropdown("contactUs")}
                >
                  <li className="p-2 py-4 lg:p-4 border-b md:border-0">
                    <a href="#">Contact Us</a>
                    {dropdownStates.contactUs && (
                      <div className="md:absolute bg-white left-0 z-10 top-[57px] lg:top-[60px] md:w-[200px] shadow-md">
                        <div className="cursor-pointer p-4 text-black hover:text-red-600 hover:bg-gray-300">
                          Settings
                        </div>
                        <div className="cursor-pointer p-4 text-black hover:text-red-600 hover:bg-gray-300">
                          User
                        </div>
                        <div className="cursor-pointer p-4 text-black hover:text-red-600 hover:bg-gray-300">
                          Class
                        </div>
                      </div>
                    )}
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navi;
