import React from "react";
import { ButtonGroup, Carousel } from "@material-tailwind/react";
import { DateTimePicker } from "@mui/x-date-pickers";
import ListBox from "../components/ListBox/ListBox";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Button from "../components/Button/Button";
import { ButtonBase } from "@mui/material";
type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="relative h-screen">
      <Carousel autoplay={true} loop={true} placeholder={""}>
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/1128527/pexels-photo-1128527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Nature"
        />
        <img
          src="https://images.pexels.com/photos/1172105/pexels-photo-1172105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.pexels.com/photos/11139552/pexels-photo-11139552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className="absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-cyan-100 w-[1000px] h-[400px] rounded-3xl p-5">
          <div className="grid grid-cols-3 gap-2">
            <div className="me-4">
              <p>Şehir:</p>
              <ListBox />
            </div>
            <div className="">
              <p>Alış Tarihi:</p>
              <DateTimePicker className="w-full cursor-default shadow-md sm:text-sm rounded-[4px] bg-white" />
            </div>
            <div className="">
              <p>Teslim Tarihi:</p>
              <DateTimePicker className="w-full cursor-default shadow-md sm:text-sm rounded-[4px] bg-white" />
            </div>
          </div>
          <div className="grid justify-end mt-3">

          <Button
            size={48}
            text="Uygun Aracı Bul"
            _border_color="green-600"
            _text_color="green-400"
            _hover_bg_color="green-600"
            _hover_text_color="green-200"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
