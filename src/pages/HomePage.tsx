import { Carousel } from "@material-tailwind/react";
import ListBox from "../components/ListBox/ListBox";
import Button from "../components/Button/Button";
import DatePicker from "../components/DatePicker/DatePicker";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  RefAttributes,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addRental,
  rentalList,
  setEndDate,
  setStartDate,
} from "../store/slices/rentalSlice";
import {
  DateTimePicker,
  DateTimePickerProps,
  DateTimeValidationError,
  DateValidationError,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";

type Props = {};

const HomePage = (props: Props) => {
  const rentalState = useSelector((state: any) => state.rental);
  const branchState = useSelector((state: any) => state.branch);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(null);

  const [error, setError] = useState<DateTimeValidationError | null>(null);
  // Butonu pasif yapmak için bir state tanımladık
  const [isDisabled, setIsDisabled] = useState(true);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Geçerli bir tarih giriniz.";
      }

      case "minTime": {
        return "Seçilen tarih alış tarihinden önce olmamalıdır.";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  // const rentalData = {
  //   startDate: rentalState.selectedStartDate,
  //   endDate: rentalState.selectedEndDate,
  //   startLocation: branchState.selectedBranch
  // };

  // console.log(rentalData);
  

  useEffect(() => {
    dispatch(rentalList());
  }, [dispatch]);

  /* StartDate için global state*/
  useEffect(() => {
    dispatch(setStartDate(selectedStartDate?.format("YYYY-MM-DD")));
  }, [selectedStartDate]);

  /* EndDate için global state*/
  useEffect(() => {
    dispatch(setEndDate(selectedEndDate?.format("YYYY-MM-DD")));
    // dispatch(setEndDate(selectedEndDate?.format("YYYY-MM-DD HH:mm")));  doğru olan
  }, [selectedEndDate]);

  // Seçim yaptığımız yerlerdeki değişiklikleri takip etmek için bir useEffect kullandık
  useEffect(() => {
    // Seçim yaptığımız yerlerin boş olup olmadığını kontrol ettik
    if (
      selectedStartDate &&
      selectedEndDate &&
      branchState.selectedBranch !== undefined &&
      error == null
    ) {
      // Eğer boş değilse, butonu aktif yaptık
      setIsDisabled(false);
    } else {
      // Eğer boşsa, butonu pasif yaptık
      setIsDisabled(true);
    }
  }, [selectedStartDate, selectedEndDate, branchState.selectedBranch, error]);

  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 7rem)" }}>
      <Carousel
        transition={{ duration: 2 }}
        autoplay={true}
        loop={true}
        placeholder={""}
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`hidden h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )}
      >
        <img
          className="h-full w-full  object-cover"
          src="https://images.pexels.com/photos/1128527/pexels-photo-1128527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <img
          src="https://images.pexels.com/photos/1172105/pexels-photo-1172105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.pexels.com/photos/11139552/pexels-photo-11139552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className="absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-delta-yellow w-[1000px] h-[400px] rounded-3xl p-5">
          <div className="grid grid-cols-3 gap-2">
            <div className="me-4">
              <p>Şube:</p>
              <ListBox />
            </div>
            <div className="">
              <p>Alış Tarihi:</p>
              <DateTimePicker
                ampm={false}
                disablePast
                format="DD/MM/YYYY HH:mm"
                value={selectedStartDate}
                onChange={(newValue: Dayjs | null) => {
                  setSelectedStartDate(newValue);
                }}
                className="w-full cursor-default shadow-md sm:text-sm rounded-[4px] bg-white"
              />
            </div>
            <div className="">
              <p>Teslim Tarihi:</p>
              <DateTimePicker
                ampm={false}
                disablePast
                format="DD/MM/YYYY HH:mm"
                value={selectedEndDate}
                onChange={(newValue: Dayjs | null) => {
                  setSelectedEndDate(newValue);
                }}
                className="w-full cursor-default shadow-md sm:text-sm rounded-[4px] bg-white"
                minTime={
                  selectedStartDate?.format("MM-DD") ==
                  selectedEndDate?.format("MM-DD")
                    ? selectedStartDate?.add(1, "hour")
                    : dayjs().startOf("day")
                } // alış tarihinden 1 saat sonrası
                minDate={selectedStartDate?.add(0, "day")}
                onError={(newError: any) => setError(newError)}
                slotProps={{
                  textField: {
                    helperText: errorMessage,
                  },
                }}
              />
            </div>
          </div>
          <div className="grid justify-end mt-3">
            <Link to="/cars/getCarAvailability">
              <button
                type="submit"
                className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500 shadow-[0px_0px_10px_5px_#f8e61b]"
                disabled={isDisabled}
              >
                Uygun aracı kirala
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
