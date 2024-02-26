import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDropdown, selectOption } from "../../store/slices/dropdownSlice";
import { setToggle, setActive } from "../../store/slices/adminPageSlice";
import AddCar from "../../components/AdminPage/Car/AddCar";
import CarTable from "../../components/AdminPage/Car/CarTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faBuilding,
  faCarSide,
  faChevronDown,
  faChevronLeft,
  faHouse,
  faPalette,
  faPen,
  faRightFromBracket,
  faTag,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import "./AdminPage.css";
import AddBrand from "../../components/AdminPage/Brand/AddBrand";
import Brand from "../../components/AdminPage/Brand/Brand";
import Dropdown from "../../components/Dropdown/Dropdown";
import AddModel from "../../components/AdminPage/CarModel/AddModel";
import AddColor from "../../components/AdminPage/Color/AddColor";
import Branches from "../../components/AdminPage/Branch/Branches";
import Rentals from "../../components/AdminPage/Rental/AdminRentals";
import Model from "../../components/AdminPage/CarModel/Model";
import AdminHomepage from "../../components/AdminPage/AdminHomePage/AdminHomepage";
import AdminRentals from "../../components/AdminPage/Rental/AdminRentals";
import AdminNav from "../../components/AdminPage/AdminNav/AdminNav";
import BranchCards from "../../components/AdminPage/Branch/BranchCards";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { toggle, active } = useSelector((state: any) => state.adminPage);
  const [dropdown1IsOpen, setDropdown1IsOpen] = useState(false);
  const [dropdown2IsOpen, setDropdown2IsOpen] = useState(false);
  const { isOpen, selectedOption } = useSelector(
    (state: any) => state.dropdown
  );

  const closeOtherDropdowns = (dropdownNumber: number) => {
    if (dropdownNumber === 1) {
      setDropdown2IsOpen(false);
    } else if (dropdownNumber === 2) {
      setDropdown1IsOpen(false);
    }
  };
  const handleToggle = () => {
    dispatch(setToggle(!toggle));
  };

  const handleSetActive = (text: string | any) => {
    dispatch(setActive(text));
  };

  const handleDropdownToggle = () => {
    dispatch(toggleDropdown());
  };

  const handleSelectOption = (option: string) => {
    dispatch(selectOption(option));
  };

  return (
    <div className="bg-delta-green-400">
      <div className="grid grid-rows-3 grid-flow-col gap-4 ">
        <div className="row-span-3 h-full fixed left-0 top-0 z-10 overflow-x-hidden">
          <div
            className={`${
              toggle ? "w-[5.8rem] h-full" : ""
            } bg-delta-green-1000 text-delta-green-400 w-[20rem] h-full p-4 transition-all duration-500 border-solid border-glass relative  `}
          >
            <div
              className={`flex gap-4 items-center ${
                toggle
                  ? "bg-none transition-all duration-300 delay-200"
                  : "rounded-xl p-1"
              }`}
            >
              <div className="min-w[3rem] h-[3rem] ">
                <img
                  className="h-full rounded-full object-cover"
                  src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1708778795/ui4uawgetua3ymvr2adg.jpg"
                  alt=""
                />
              </div>
              <div className={`${toggle ? "opacity-0 delay-200" : ""}`}>
                <p className="text-sm ">Merve Keser</p>
                <span className="text-[0.75rem] opacity-60">
                  merve@mail.com
                </span>
              </div>
            </div>
            <div className="">
              <div
                className={`${
                  toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"
                } @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white group transition-all duration-300`}
                >
                </div>
                <div
              className="absolute top-[2rem] flex right-2 justify-center items-center w-7 h-7 bg-white text-delta-green-1000 rounded-full cursor-pointer"
              onClick={handleToggle}
            >
              <FontAwesomeIcon
                className={`${
                  toggle ? "rotate-180" : ""
                } text-2xl transition-all duration-300`}
                icon={faChevronLeft}
              />
              </div> 
                
              <div
                className={`${
                  toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"
                } @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white group hover:text-delta-green-1000 transition-all duration-300`}
              >
                <div className="text-delta-green-400 group-hover:text-delta-green-1000 mr-3 text-[1.2rem]">
                  <FontAwesomeIcon icon={faCarSide} />{" "}
                </div>
                <div
                  className={`${
                    toggle ? "opacity-0 delay-200" : ""
                  } text-delta-green-400 group-hover:text-delta-green-1000 text-[1.2rem] whitespace-pre`}
                >
                  
                    <button onClick={() => handleSetActive("Araç Ekle")}>
                      Araç Ekle
                    </button>
                  
                </div>
              </div>
              <div
                className={`${
                  toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"
                } @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white group transition-all duration-300`}
              >
                <div className="text-delta-green-400 group-hover:text-delta-green-1000 mr-3 text-[1.2rem]">
                  <FontAwesomeIcon icon={faPen} />{" "}
                </div>
                <div
                  className={`${
                    toggle ? "opacity-0 delay-200" : ""
                  } text-delta-green-400 group-hover:text-delta-green-1000 text-[1.2rem] whitespace-pre`}
                >
                  
                    <button onClick={() => handleSetActive("Araçlar")}>
                      Araçlar
                    </button>
                  
                </div>
              </div>

              <Dropdown
                select="Marka"
                option="Marka Ekle"
                option2="Markalar"
                icon={<FontAwesomeIcon icon={faChevronDown} />}
                icon2={<FontAwesomeIcon icon={faTag} />}
                toggle={toggle}
                isOpen={dropdown1IsOpen}
        setIsOpen={setDropdown1IsOpen}
        closeOtherDropdowns={() => closeOtherDropdowns(1)}
              />

              <Dropdown
                select="Model"
                option="Model Ekle"
                option2="Modeller"
                icon={<FontAwesomeIcon icon={faChevronDown} />}
                icon2={<FontAwesomeIcon icon={faTags} />}
                toggle={toggle}
                isOpen={dropdown2IsOpen}
        setIsOpen={setDropdown2IsOpen}
        closeOtherDropdowns={() => closeOtherDropdowns(2)}
              />

              <div
                className={`${
                  toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"
                } @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white group transition-all duration-300`}
              >
                <div className="text-delta-green-400 group-hover:text-delta-green-1000 mr-3 text-[1.2rem]">
                  <FontAwesomeIcon icon={faPalette} />{" "}
                </div>
                <div
                  className={`${
                    toggle ? "opacity-0 delay-200" : ""
                  } text-delta-green-400 group-hover:text-delta-green-1000 text-[1.2rem] whitespace-pre`}
                >
                  
                    <button onClick={() => handleSetActive("Renk Ekle")}>
                      Renk Ekle
                    </button>
                  
                </div>
              </div>
              <div
                className={`${
                  toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"
                } @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white group transition-all duration-300`}
              >
                <div className="text-delta-green-400 group-hover:text-delta-green-1000 mr-3 text-[1.2rem]">
                  <FontAwesomeIcon icon={faBuilding} />{" "}
                </div>
                <div
                  className={`${
                    toggle ? "opacity-0 delay-200" : ""
                  } text-delta-green-400 group-hover:text-delta-green-1000 text-[1.2rem] whitespace-pre`}
                >
                  
                    <button onClick={() => handleSetActive("Ofisler")}>
                      Ofisler
                    </button>
                  
                </div>
              </div>

              <div
                className={`${
                  toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"
                } @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white group transition-all duration-300`}
              >
                <div className="text-delta-green-400 group-hover:text-delta-green-1000 mr-3 text-[1.2rem]">
                  <FontAwesomeIcon icon={faBookmark} />{" "}
                </div>
                <div
                  className={`${
                    toggle ? "opacity-0 delay-200" : ""
                  } text-delta-green-400 group-hover:text-delta-green-1000 text-[1.2rem] whitespace-pre`}
                >
                  
                    <button onClick={() => handleSetActive("Kiralamalar")}>
                      Kiralamalar
                    </button>
                  
                </div>
              </div>
            </div>

            
            
          </div>
        </div>
        <div className={`${toggle ? "ml-[12rem] transition-all duration-500 " : "ml-[25rem]"} 
        row-span-2  mr-5 mt-0 rounded-lg`}>
         <div>
          <AdminNav/>
         </div>
         <div>
          <BranchCards/>
         </div>
          {active === "Araç Ekle" && <AddCar />}
          {active === "Araçlar" && <CarTable />}
          {active === "Marka Ekle" && <AddBrand />}
          {active === "Markalar" && <Brand />}
          {active === "Model Ekle" && <AddModel />}
          {active === "Modeller" && <Model />}
          {active === "Renk Ekle" && <AddColor />}
          {active === "Ofisler" && <Branches />}
          {active === "Kiralamalar" && <AdminRentals />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
