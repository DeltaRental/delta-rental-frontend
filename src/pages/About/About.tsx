import React from "react";
import Footer from "../../components/Footer/Footer";

type Props = {};

const About = (props: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen container mx-auto">
      <div className="flex justify-center flex-grow">
        <div className="m-3 text-white">
          <p
            className="text-left text-4xl text-black font-bold mt-10"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            data-aos-delay="800"
          >

            Hakkımızda
          </p>

          <p
            className="mt-10 text-left text-3xl text-black font-bold mb-5"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            data-aos-delay="800"
          >
            Delta Rental
          </p>
          <p
            className=" text-black text-xl"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1500"
            data-aos-delay="800"
          >
            Delta Rental, araç kiralama sektöründe öncü bir marka olarak
            müşterilerine konforlu, hesaplı ve güvenilir bir hizmet sunmaktadır.
            Onurcan Şenel, Merve Keser ve Rıdvan Gürsoy'un liderliğinde kurulan
            Delta Rental, Engin Demiroğ ve Halit Enes Kalaycı önderliğinde,
            Tobeto eğitim platformundan aldığı ilhamla yola çıkmıştır.
          </p>

          <p
            className="my-10 text-left text-3xl text-black font-bold"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            data-aos-delay="800"
          >
            Ekip Üyeleri
          </p>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center">
              <a href="https://github.com/rdvngrsy" target="_blank">
                <img
                  className=" rounded-full object-cover shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                  src="https://avatars.githubusercontent.com/u/58063753?v=4"
                  alt="RidvanGursoy-image"
                  data-aos="fade-right"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  data-aos-delay="800"
                />
              </a>
              <p
                className="text-black mt-10 text-2xl font-bold"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
                data-aos-delay="800"
              >
                Rıdvan Gürsoy
              </p>
            </div>
            <div className="flex flex-col items-center">
              <a href="https://github.com/mervekeser" target="_blank">
                <img
                  className="h-full w-full rounded-full object-cover shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                  src="https://avatars.githubusercontent.com/u/119412056?v=4"
                  alt="MerveKeser-image"
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  data-aos-delay="800"
                />
              </a>
              <p
                className="text-black mt-10 text-2xl font-bold"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
                data-aos-delay="800"
              >
                Merve Keser
              </p>
            </div>
            <div className="flex flex-col items-center">
              <a href="https://github.com/onursenel" target="_blank">
                <img
                  className="h-full w-full rounded-full object-cover shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
                  src="https://avatars.githubusercontent.com/u/102322010?v=4"
                  alt="OnurcanŞenel-image"
                  data-aos="fade-left"
                  data-aos-easing="linear"
                  data-aos-duration="1500"
                  data-aos-delay="800"
                />
              </a>
              <p
                className="text-black mt-10 text-2xl font-bold"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1500"
                data-aos-delay="800"
              >
                Onurcan Şenel
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
