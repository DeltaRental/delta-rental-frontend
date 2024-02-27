import { useState } from "react";
import NavDatePicker from "./NavDatePicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Link from "../../CustomLink/Link";


type Props = {};

const AdminNav = (props: Props) => {
  const [selectedDate] = useState(new Date());

  return (
    <div
      className=" h-full flex justify-between 
                    rounded-lg bg-delta-green-1000 shadow-lg shadow-delta-green-1200 px-1"
    >
      <NavDatePicker/>

      <div className="mr-[6rem] ">
        <img
          className="rounded-full w-[4.5rem] h-[4.5rem]"
          src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1708778795/ui4uawgetua3ymvr2adg.jpg"
          alt="logo"
        />
      </div>
      <div
              className={` @apply flex items-center p-2 rounded-lg cursor-pointer text-delta-green-400`}
            >
                <Link
                to={"/"}
                className={`text-delta-green-400 pr-1 text-[1.2rem] whitespace-pre inset-x-0 bottom-0`}
              >
                Ana Sayfa
              </Link>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="mr-1 text-[1.2rem]"
              />
              
            </div>
    </div>
  );
};

export default AdminNav;
