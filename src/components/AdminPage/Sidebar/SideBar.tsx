import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import UserProfile from "./UserProfile";
import SidebarData from "./SidebarData";
type Props = {};

const SideBar = (props: Props) => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div
      className={`${toggle ? "w-[5.8rem]" : ""} @apply bg-gray-800 text-gray-300 
    h-[38rem] w-[20rem] rounded-lg mt-2
    ml-4 p-4 transition-all duration-500
    border-solid border-glass relative `}
    >
      <UserProfile toggle={toggle}/>
      <SidebarData toogle={toggle}/>
      <div
        className="absolute top-[7rem] flex
                      justify-center items-center 
                      -left-5 w-9 h-9 bg-white text-black 
                      rounded-full cursor-pointer"
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <FontAwesomeIcon
          className={`${toggle ? "rotate-180" : ""} text-3xl transition-all
         duration-300`}
          icon={faChevronLeft}
        />
      </div>
    </div>
  );
};

export default SideBar;
