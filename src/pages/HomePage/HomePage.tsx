import { Carousel } from "@material-tailwind/react";
import ListBox from "../../components/ListBox/ListBox";
import Button from "../../components/Button/Button";
import DatePicker from "../../components/DatePicker/DatePicker";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
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
} from "../../store/slices/rentalSlice";
import {
  DateTimePicker,
  DateTimePickerProps,
  DateTimeValidationError,
  DateValidationError,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import "../HomePage/HomePage.css";

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
    <>
      <div className="">
        <div
          className=" w-full relative "
          style={{ height: "calc(100vh - 7rem)" }}
        >
          <Carousel
            transition={{ duration: 2 }}
            autoplay={true}
            loop={true}
            placeholder={""}
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 flex -translate-x-2/4 gap-2">
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

          <div className="absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[49]">
            <div className="  backdrop-blur-sm bg-delta-green-400/80  hover:backdrop-blur-lg hover:bg-delta-green-400 transition ease-in duration-500 w-[1000px] h-[200px] rounded-3xl p-5">
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
                    className={
                      isDisabled
                        ? `w-full flex justify-center bg-delta-green-1000  text-white  p-3  rounded-lg tracking-wide font-semibold `
                        : `w-full flex justify-center bg-delta-green-1000 hover:bg-delta-green-600 text-delta-green-400 hover:text-delta-green-1000 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500 shadow-[0px_0px_2px_2px_#ddf051]`
                    }
                    disabled={isDisabled}
                  >
                    Uygun aracı kirala
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-t from-gray-200 from-25% via-70% to-100%  absolute top-[300px]  w-full min-h-[1100px] ">
            <div className="w-full mx-auto mt-[580px] flex justify-center space-x-4">
              <div className="relative grid h-[27rem] w-full max-w-[38rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1708972542/tm5v1xjcrorybtvtshya.jpg')] bg-contain bg-no-repeat bg-clip-border bg-center text-gray-700 shadow-none">
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
                </div>
                <div className="relative p-6 px-6 py-14 md:px-12">
                  <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                    İstediğin aracı istediğin zaman kullanmanın tadını çıkar.
                  </h2>
                  <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-200">
                    Delta Rental
                  </h5>
                </div>
              </div>

              <div className="relative grid h-[27rem] w-full max-w-[38rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1708972763/za4enayy9apdim2kufr9.png')] bg-contain bg-no-repeat bg-clip-border bg-center text-gray-700 shadow-none">
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
                </div>
                <div className="relative p-6 px-6 py-14 md:px-12">
                  <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                    Son model bir BMW deneyimlemek istemez miydin?
                  </h2>
                  <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-200">
                    Delta Rental
                  </h5>
                </div>
              </div>

              <div className="relative grid h-[27rem] w-full max-w-[38rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1708969930/skkqsthap49n2re8b1ru.png')] bg-contain bg-no-repeat bg-clip-border bg-center text-gray-700 shadow-none">
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
                </div>
                <div className="relative p-6 px-6 py-14 md:px-12">
                  <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                    Elektrikli araçlar ile yeni bir çağa ayak uydur.
                  </h2>
                  <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-200">
                    Delta Rental
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[70px] container mx-auto flex space-x-5 ">
          <div className="hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            <img src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1709327747/xr1nssvtbepbvcgom1rb.jpg" />
          </div>
          <div className="hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            <img src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1709327811/f2vkcvlypakk0vjoa7pb.jpg" />
          </div>
          <div className="hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
            <img src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1709327831/r7k1qlb9ru8yngailxex.jpg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
