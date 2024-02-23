import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectOption, toggleDropdown } from '../../store/slices/dropdownSlice';
import { setActive } from '../../store/slices/adminPageSlice';

type Props = {
    select: string,
    option?: string | any,
    option2?: string | any,
    toggle: boolean,
    icon: any,
    icon2: any
}

const Dropdown = (props: Props) => {
    const dispatch = useDispatch();
    
    const {active} = useSelector((state: any)=> state.adminPage);
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSetActive = (text:string) => {
      dispatch(setActive(text));
    };
    return (
      <div  className={`${props.toggle ? "last:w-[3.6rem]" : "last:w-[17rem]"} @apply flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:bg-white transition-all duration-300`}>
                    <div className="text-gray-400 mr-3 text-[1.2rem]">{props.icon2} </div>
                    <div className={`${props.toggle ? "opacity-0 delay-200" : ""} text-gray-400 text-[1.2rem] whitespace-pre`}>
                      <nav>
                         {props.select}
                        <button className="ml-[10rem]" onClick={toggleDropdown}>{props.icon} </button>
                        {isOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={() => handleSetActive(props.option)}>{props.option}</li>
                  <li onClick={() => handleSetActive(props.option2)}>{props.option2} </li>
                </ul>
              </div>
            )}
                      </nav>
                    </div>
                  </div>
    );
}

export default Dropdown