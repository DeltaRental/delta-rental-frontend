import React, { useState } from "react";
import CartSummary from "../CartSummary/CartSummary";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Link from "../CustomLink/Link";
import Bars from "../TransitionBar/TransitionBar";

type DropdownStates = {
  services: boolean;
  contactUs: boolean;
  // Diğer dropdownlar eklenebilir
};

const Navi = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    services: false,
    contactUs: false,
  });

  const navigate = useNavigate();


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
    <div className="bg-gray-800">
      <nav className="container p-3 mx-auto md:p-6 lg:p-8 ">
        <div className="flex items-center justify-between flex-row-reverse">
          <FontAwesomeIcon
            className={`w-7 h-7 md:hidden cursor-pointer transition-transform transform ${isMenuOpen ? "rotate-0" : "rotate-180"
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
            <div className="col-span-4 text-base lg:text-lg md:border-y border-y-white">
              <ul className="justify-between md:flex ">
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="/">

                    <p className="text-xl font-medium text-blue-gray-300 dark:text-blue-gray-300">Ana Sayfa</p>

                  </Link>
                </li>
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="/cars/getAll"><p className="text-xl font-medium text-blue-gray-300 dark:text-blue-gray-300">Araçlar</p></Link>
                </li>
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="#"><p className="text-xl font-medium text-blue-gray-300 dark:text-blue-gray-300">Hakkımızda</p></Link>
                </li>
              </ul>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1 border-2 border-black border-dotted rounded-full">
                  <img
                    className="md:mx-auto w-14 h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-full "
                    src="https://avatars.githubusercontent.com/u/156099996?s=200&v=4"
                    alt="logo_4"
                    data-ezsrc="/static_files/images/logos/logo_4.png?ezimgfmt=rs:112x83/rscb1/ngcb1/notWebP"
                  />
                </div>
              </div>
            </div>
            <div className=" col-span-4 md:border-y border-y-white">
              <ul className="justify-between text-base lg:text-lg  md:flex">
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="#"><p className="text-xl font-medium text-blue-gray-300 dark:text-blue-gray-300">Company</p></Link>
                </li>

                <div
                  className="relative hover:bg-white hover:text-red-600"
                  onMouseEnter={() => handleToggleDropdown("services")}
                  onMouseLeave={() => handleToggleDropdown("services")}
                >
                  <li className="p-2 py-2 lg:p-2 border-b md:border-0">
                    <Link to="#"><p className="text-xl font-medium text-blue-gray-300 dark:text-blue-gray-300">Services</p></Link>
                    {dropdownStates.services && (
                      <div className="md:absolute bg-white left-0 z-10 top-[41px] lg:top-[44px] md:w-[200px] shadow-md">
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
                  <li className="p-2 py-2 lg:p-2 border-b md:border-0">
                    <Link to="#"><p className="text-xl font-medium text-blue-gray-300 dark:text-blue-gray-300">İletişim</p></Link>
                    {dropdownStates.contactUs && (
                      <div className="md:absolute bg-white left-0 z-10 top-[41px] lg:top-[44px] md:w-[200px] shadow-md">
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
      <Bars/>
    </div>
  );
};

export default Navi;
