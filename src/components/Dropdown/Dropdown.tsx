import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../store/slices/adminPageSlice';

type Props = {
  select: string,
  option?: string | any,
  option2?: string | any,
  icon: any,
  icon2: any,
  toggle: boolean,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, // setIsOpen fonksiyonu props olarak tanımlandı
  closeOtherDropdowns: () => void
}

const Dropdown = (props: Props) => {
  const dispatch = useDispatch();
  const { active } = useSelector((state: any) => state.adminPage);

  const toggleDropdown = () => {
    props.setIsOpen(!props.isOpen);
  };

  const handleSetActive = (text: string) => {
    dispatch(setActive(text));
  };

  const closeOtherDropdowns = () => {
    const dropdowns = document.querySelectorAll('.dropdown-menu') as NodeListOf<HTMLElement>; // Tüm dropdown menülerini seç
  
    dropdowns.forEach((dropdown: any) => {
      if (dropdown !== props.isOpen) { // Mevcut dropdown hariç diğer dropdownları kapat
        dropdown.style.display = 'none';
      }
    });
  };
  

  const handleDropdownClick = () => {
    closeOtherDropdowns();
    props.setIsOpen(!props.isOpen);
  };

  return (
   
      <div className={`${props.toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"} @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white group transition-all duration-300`}>
        <div className="text-delta-green-400 group-hover:text-delta-green-1000 mr-3 text-[1.2rem]">{props.icon2}</div>
        <div className={`${props.toggle ? "opacity-0 delay-200" : ""} text-delta-green-400 group-hover:text-delta-green-1000 text-[1.2rem] whitespace-pre`} onClick={handleDropdownClick}>
          {props.select}
          <button className="ml-1" onClick={toggleDropdown}>{props.icon}</button>
          {props.isOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => handleSetActive(props.option)}>{props.option}</li>
                <li onClick={() => handleSetActive(props.option2)}>{props.option2}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
  );
}

export default Dropdown;
