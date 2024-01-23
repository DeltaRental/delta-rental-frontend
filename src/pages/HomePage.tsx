import { Carousel } from "@material-tailwind/react";
import ListBox from "../components/ListBox/ListBox";
import Button from "../components/Button/Button";
import DatePicker from "../components/DatePicker/DatePicker";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="relative h-[1299px]">
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
        <div className="bg-cyan-100 w-[1000px] h-[400px] rounded-3xl p-5">
          <div className="grid grid-cols-3 gap-2">
            <div className="me-4">
              <p>Şehir:</p>
              <ListBox />
            </div>
            <div className="">
              <p>Alış Tarihi:</p>
              <DatePicker />
            </div>
            <div className="">
              <p>Teslim Tarihi:</p>
              <DatePicker />
            </div>
          </div>
          <div className="grid justify-end mt-3">
            <Link to="/cars/getCarAvailability">
            <Button
              size={48}
              text="Uygun Aracı Bul"
              _border_color="green-600"
              _text_color="green-400"
              _hover_bg_color="green-600"
              _hover_text_color="green-200"
            />
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
    
  );
};

export default HomePage;
