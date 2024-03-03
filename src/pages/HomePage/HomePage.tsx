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
import { nextTick } from "process";
import Branch from "../Branch/Branch";
import { fetchBranches } from "../../store/slices/branchSlice";
import { GetAllBranchResponse } from "../../models/branches/response/getAllBranchResponse";

type Props = {};

const HomePage = (props: Props) => {
  const rentalState = useSelector((state: any) => state.rental);
  const branchesState = useSelector((state: any) => state.branch);
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
      branchesState.selectedBranch !== undefined &&
      error == null
    ) {
      // Eğer boş değilse, butonu aktif yaptık
      setIsDisabled(false);
    } else {
      // Eğer boşsa, butonu pasif yaptık
      setIsDisabled(true);
    }
  }, [selectedStartDate, selectedEndDate, branchesState.selectedBranch, error]);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  return (
    <>
      <div className="">
        <div
          className=" w-full z-40"
          style={{ height: "calc(100vh - 7rem)" }}
        >
          <Carousel
          className="-z-50"
            data-aos="fade-down"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
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
            nextArrow={({ loop, handleNext, lastIndex }) => (
              <button
                onClick={handleNext}
                disabled={!loop && lastIndex}
              ></button>
            )}
            prevArrow={({ loop, handlePrev, firstIndex }) => (
              <button
                onClick={handlePrev}
                disabled={!loop && firstIndex}
              ></button>
            )}
          >
            <img
              className="h-full w-full  object-cover z-0"
              src="https://images.pexels.com/photos/1128527/pexels-photo-1128527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
            <img
              src="https://images.pexels.com/photos/1172105/pexels-photo-1172105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-full w-full object-cover z-0"
            />
            <img
              src="https://images.pexels.com/photos/11139552/pexels-photo-11139552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="h-full w-full object-cover z-0"
            />
          </Carousel>

          <div className="absolute top-[370px] md:top-80 3xl:top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[49]">
            <div
            data-aos="fade-down"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
            >
              <div className="  backdrop-blur-sm bg-gray-200/80  hover:backdrop-blur-lg hover:bg-gray-200 transition ease-in duration-500 w-[400px] h-[370px] md:w-[1000px] md:h-[200px] rounded-3xl p-5">
                <div className="grid grid-cols-1 w-full gap-2 md:grid md:grid-cols-3 md:gap-2">
                  <div className="me-4 z-50">
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
                <div
                  className="grid justify-end mt-3"
                  data-aos="fade-left"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-cubic"
                  data-aos-delay="500"
                >
                  <Link to="/cars/getCarAvailability">
                    <button
                      type="submit"
                      className={
                        isDisabled
                          ? `w-full flex justify-center bg-delta-green-1000  text-white  p-3  rounded-lg tracking-wide font-semibold `
                          : `w-full flex justify-center bg-delta-green-1000 hover:bg-delta-green-600 text-white hover:text-delta-green-1000 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500 shadow-[0px_0px_2px_2px_#ddf051]`
                      }
                      disabled={isDisabled}
                    >
                      Uygun aracı kirala
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="p-2 md:p-0 mt-[-230px] md:mt-[-390px] 3xl:mt-[-450px] bg-gradient-to-t from-gray-200 from-70% via-80% to-100% md:from-25% md:via-70% md:to-100% md:min-h-[500px]">
            <div className="  w-full mx-auto  grid grid-cols-1 justify-items-center gap-4 md:flex md:flex-row md:justify-center md:space-x-4 ">
              <div
                className="relative grid 3xl:h-[27rem] 3xl:max-w-[38rem]  md:h-[24rem] md:max-w-[35rem] h-[16rem] max-w-[31rem] w-full  flex-col items-end justify-center overflow-hidden rounded-3xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1708972542/tm5v1xjcrorybtvtshya.jpg')] bg-contain bg-no-repeat bg-clip-border bg-center text-gray-700 shadow-none">
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
                </div>
                <div
                  className="relative p-6 px-6 py-14 md:px-12"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-sine"
                >
                  <h2 className="mb-6 block font-semibold text-2xl md:text-3xl leading-[1.5] tracking-normal text-white antialiased">
                    İstediğin aracı istediğin zaman kullanmanın tadını çıkar.
                  </h2>
                  <h5 className="block mb-4 font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-gray-200">
                    Delta Rental
                  </h5>
                </div>
              </div>

              <div
                className="relative grid 3xl:h-[27rem] 3xl:max-w-[38rem]  md:h-[24rem] md:max-w-[35rem] h-[16rem] max-w-[31rem] w-full flex-col items-end justify-center overflow-hidden rounded-3xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1708972763/za4enayy9apdim2kufr9.png')] bg-contain bg-no-repeat bg-clip-border bg-center text-gray-700 shadow-none">
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
                </div>
                <div
                  className="relative p-6 px-6 py-14 md:px-12"
                  data-aos="fade-down"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-sine"
                >
                  <h2 className="mb-6 block font-semibold text-2xl md:text-3xl leading-[1.5] tracking-normal text-white antialiased">
                    Son model bir BMW deneyimlemek istemez miydin?
                  </h2>
                  <h5 className="block mb-4 font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-gray-200">
                    Delta Rental
                  </h5>
                </div>
              </div>

              <div
                className="relative grid 3xl:h-[27rem] 3xl:max-w-[38rem]  md:h-[24rem] md:max-w-[35rem] h-[16rem] max-w-[31rem] w-full flex-col items-end justify-center overflow-hidden rounded-3xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                data-aos="fade-left"
                data-aos-easing="linear"
                data-aos-duration="1000"
                data-aos-delay="500"
              >
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1708969930/skkqsthap49n2re8b1ru.png')] bg-contain bg-no-repeat bg-clip-border bg-center text-gray-700 shadow-none">
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
                </div>
                <div
                  className="relative p-6 px-6 py-14 md:px-12"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  data-aos-easing="ease-in-sine"
                >
                  <h2 className="mb-6 block font-semibold text-2xl md:text-3xl leading-[1.5] tracking-normal text-white antialiased">
                    Elektrikli araçlar ile yeni bir çağa ayak uydur.
                  </h2>
                  <h5 className="block mb-4 font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-gray-200">
                    Delta Rental
                  </h5>
                </div>
              </div>
            </div>
          </div>
        
        <div className="container mx-auto flex justify-center md:justify-start md:container md:mx-auto text-4xl font-bold mt-10 3xl:flex 3xl:justify-center">
          <h1>KAMPANYALAR</h1>
        </div>
        <div
          className="p-2 md:p-0 container mx-auto grid justify-items-center gap-5 md:flex md:justify-center mt-10"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="100"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
        >
          <div className="hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-3xl max-w-[31rem]">
            <img
              className="rounded-3xl w-full"
              src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1709327747/xr1nssvtbepbvcgom1rb.jpg"
            />
          </div>
          <div className="hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-3xl max-w-[31rem]">
            <img
              className="rounded-3xl w-full"
              src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1709327811/f2vkcvlypakk0vjoa7pb.jpg"
            />
          </div>
          <div className="hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] rounded-3xl max-w-[31rem]">
            <img
              className="rounded-3xl w-full"
              src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1709327831/r7k1qlb9ru8yngailxex.jpg"
            />
          </div>
        </div>

        <div className="container mx-auto flex justify-center md:justify-start md:container md:mx-auto text-4xl mt-10 font-bold 3xl:flex 3xl:justify-center">
          <h1>ŞUBELER</h1>
        </div>
        <div
          className="p-2 md:p-0 container mx-auto grid justify-items-center gap-5 md:flex md:justify-center 3xl:flex 3xl:justify-center my-10"
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="1000"
          data-aos-delay="100"
        >
          {branchesState.branches
            .slice(0, 3)
            .map((branch: GetAllBranchResponse) => (
              <div
                key={branch.id}
                className="relative grid h-[27rem] w-full max-w-[38rem]  overflow-hidden rounded-3xl bg-white bg-clip-border text-center text-gray-700 hover:scale-[1.02] transition ease-in duration-300 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] "
              >
                <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('http://res.cloudinary.com/dxav6uhnu/image/upload/v1709396732/fu8q3ucx4vjg3yrze5ir.jpg')] bg-cover bg-top bg-no-repeat bg-clip-border text-gray-700 shadow-none z-0">
                  <div className="absolute flex justify-end  inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-delta-green-1000/80 via-black/50"></div>
                </div>
                <div className="flex flex-col justify-between">
                  <div
                    className="flex justify-start p-3 font-bold text-2xl z-40 text-white"
                    data-aos="fade-right"
                    data-aos-easing="linear"
                    data-aos-duration="1000"
                    data-aos-delay="500"
                  >
                    {branch.city} {branch.name}
                  </div>
                  <div
                    className="z-40 py-4 flex justify-center items-center text-white"
                    data-aos="fade-right"
                    data-aos-easing="linear"
                    data-aos-duration="1000"
                    data-aos-delay="500"
                  >
                    <div>
                      <p className="">{branch.gsm}</p>
                      <p className="">{branch.email}</p>
                      <p className="">Hafta içi: 08.00 - 19.00</p>
                      <p className="">Hafta sonu: 10.00 - 18.00</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
