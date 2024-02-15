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
      className={`${toggle ? "w-[5.8rem]" : ""} @apply bg-gray-600 text-gray-300 
     h-screen fixed left-0 w-[20rem] p-4 transition-all duration-500
    border-solid border-glass relative `}
    >
      <UserProfile toggle={toggle}/>
      <SidebarData toogle={toggle}/>
      <div
        className="absolute top-[2rem] flex right-1
                      justify-center items-center 
                       w-9 h-9 bg-white text-black 
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
