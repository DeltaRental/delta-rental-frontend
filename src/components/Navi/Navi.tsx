import React, { useEffect, useState } from "react";
import CartSummary from "../CartSummary/CartSummary";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faBars,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Link from "../CustomLink/Link";
import Bars from "../TransitionBar/TransitionBar";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "../../models/JwtTokenPayload/MyJwtPayload";
import { AppDispatch } from "../../store/store";
import { setIsLoggedIn } from "../../store/slices/userSlice";

type DropdownStates = {
  services: boolean;
  user: boolean;
  // Diğer dropdownlar eklenebilir
};

const Navi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const userState = useSelector((state: any) => state.user);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<DropdownStates>({
    services: false,
    user: false,
  });
  const [decode, setDecode] = useState<MyJwtPayload>();

  useEffect(() => {
    let token: string | null = localStorage.getItem("jsonwebtoken");
    if (token) {
      const jwtDecoded = jwtDecode(token) as MyJwtPayload;
      setDecode(jwtDecoded);
    }
  }, [userState.isloggedIn]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleToggleDropdown = (dropdownName: keyof DropdownStates) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  const handleLogOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("jsonwebtoken");
    dispatch(setIsLoggedIn(false));
    dropdownStates.user = false;
    navigate("/");
  };

  //AdminPage' de navbarı etkisizleştirir.
  if (location.pathname === "/admin"){
    return null;
  }
  else if (location.pathname === "/payment/success") {
    return null;
  }

  return (
    <div className=" sticky top-0 left-0 right-0 bg-delta-green-1000 bg-opacity-80 z-50">
      <nav className=" container mx-auto p-3  md:p-6 lg:p-8 ">
        <div className="flex items-center justify-between flex-row-reverse">
          <FontAwesomeIcon
            className={`w-7 h-7 md:hidden cursor-pointer text-delta-green-400 transition ease-in duration-300 ${
              isMenuOpen ? "rotate-0" : "rotate-180"
            }`}
            icon={isMenuOpen ? faTimes : faBars}
            onClick={toggleMenu}
          />
          <div className="md:hidden p-1  ">
            <img
              className="md:mx-auto w-12 h-12 rounded-3xl object-contain"
              src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1708778795/ui4uawgetua3ymvr2adg.jpg"
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
            <div className="col-span-4 text-base lg:text-lg md:border-y border-y-delta-green-400">
              <ul className="justify-between md:flex ">
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="/">
                    <p className="text-xl font-medium text-delta-green-400 dark:text-white">
                      Ana Sayfa
                    </p>
                  </Link>
                </li>
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="/cars/getAll">
                    <p className="text-xl font-medium text-delta-green-400 dark:text-white">
                      Araçlar
                    </p>
                  </Link>
                </li>
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="/about">
                    <p className="text-xl font-medium text-delta-green-400 dark:text-white">
                      Hakkımızda
                    </p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-1 ">
                  <img
                    className="md:mx-auto w-14 h-14 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-3xl object-contain"
                    src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1708778795/ui4uawgetua3ymvr2adg.jpg"
                    alt="logo_4"
                    data-ezsrc="/static_files/images/logos/logo_4.png?ezimgfmt=rs:112x83/rscb1/ngcb1/notWebP"
                  />
                </div>
              </div>
            </div>
            <div className=" col-span-4 md:border-y border-y-delta-green-400">
              <ul className="justify-between text-base lg:text-lg  md:flex">
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">

                  <Link to="/branch">
                    <p className="text-xl font-medium text-white dark:text-white">
                      Şubeler
                    </p>
                  </Link>
                </li>
                <li className="p-2 py-2 lg:p-2 border-b  md:border-0">
                  <Link to="/contact">
                    <p className="text-xl font-medium text-white dark:text-white">
                      İletişim

                    </p>
                  </Link>
                </li>


                
                {localStorage.getItem("jsonwebtoken") == null ? (
                  <div className="relative">
                    <li className="p-2 py-2 lg:p-2 border-b md:border-0">
                      <Link
                        className="flex justify-center items-center whitespace-nowrap"
                        to="/login"
                      >
                        <p className="text-xl font-medium text-delta-green-400 dark:text-white">
                          Üye Girişi
                        </p>
                        <FontAwesomeIcon
                          className="text-delta-green-400 ms-2"
                          icon={faRightToBracket}
                        />
                      </Link>
                    </li>
                  </div>
                ) : (
                  <div
                    className="relative text-delta-green-400 hover:bg-delta-green-400 hover:text-delta-green-1000 transition ease-in duration-200"
                    onMouseEnter={() => handleToggleDropdown("user")}
                    onMouseLeave={() => handleToggleDropdown("user")}
                  >
                    <li className="p-2 py-2 lg:p-2 border-b md:border-0 ">
                      <Link to="#">
                        <p className="text-xl font-medium text-nowrap  dark:text-white">
                          {`Merhaba ${decode?.firstname}`}
                        </p>
                      </Link>
                      {dropdownStates.user && (
                        <div className="md:absolute bg-delta-green-400  left-0 z-0 top-[41px] lg:top-[44px] md:w-[200px] shadow-md">
                          <Link
                            className="w-full justify-start flex cursor-pointer p-4 text-delta-green-1000 hover:text-delta-green-400 hover:bg-delta-green-800 transition ease-in duration-100"
                            to={"/profile"}
                          >
                            Kullanıcı bilgilerim
                          </Link>

                          <Link
                            className="w-full justify-start flex cursor-pointer p-4 text-delta-green-1000 hover:text-delta-green-400 hover:bg-delta-green-800 transition ease-in duration-100"
                            to={"/profile/rentals"}
                          >
                            Siparişlerim
                          </Link>
                          <Link
                            className="w-full justify-start flex cursor-pointer p-4 text-delta-green-1000 hover:text-delta-green-400 hover:bg-delta-green-800 transition ease-in duration-100"
                            to={"/profile/invoices"}
                          >
                            Faturalarım
                          </Link>
                          <button
                            className="w-full justify-start flex cursor-pointer p-4 text-delta-green-1000 hover:text-delta-green-400 hover:bg-delta-green-800 transition ease-in duration-100"
                            onClick={handleLogOut}
                          >
                            Çıkış yap
                          </button>
                        </div>
                      )}
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Bars />
    </div>
  );
};

export default Navi;
