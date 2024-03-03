import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Rentals from "./Rentals";
import Invoices from "./Invoices";
import Link from "../../components/CustomLink/Link";
import UserInfo from "./UserInfo";

type Props = {};

function UserPanel({}: Props) {
  const [activeTab, setActiveTab] = useState("profile");
  const location = useLocation();

  useEffect(() => {
    const currentPath: string | undefined = location.pathname.split("/").pop();
    setActiveTab(currentPath!);
  }, [location]);

  return (
    <div className="container mx-auto mt-5 mb-10 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
      <div className="md:grid md:grid-cols-12 min-h-screen text-black bg-white  rounded-lg">
        <ul className="col-span-2  space-y-4 text-base font-medium  me-2 md:me-2 mb-4 md:mb-0 mt-7 ms-2">
          <li>
            <Link
              to={"/profile"}
              onClick={() => setActiveTab("profile")}
              className={`inline-flex items-center px-4 py-3 mt-3 md:mt-0 rounded-lg w-full ${
                activeTab === "profile"
                  ? "bg-delta-green-1000 text-white"
                  : "bg-gray-50"
              }`}
            >
              Kullanıcı Bilgilerim
            </Link>
          </li>
          <li>
            <Link
              to={"/profile/rentals"}
              onClick={() => setActiveTab("rentals")}
              className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                activeTab === "rentals"
                  ? "bg-delta-green-1000 text-white"
                  : "bg-gray-50"
              }`}
            >
              Siparişlerim
            </Link>
          </li>
        </ul>
        <div className="col-span-10 p-6  text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg border bg-white">
          {activeTab === "profile" && <UserInfo />}
          {activeTab === "rentals" && <Rentals />}
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
