import {
  faEnvelope,
  faLocation,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div className="container mx-auto min-h-screen flex items-center justify-center">
      <div
        className="bg-white rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-hidden w-11/12 md:w-2/3 lg:w-1/2"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="1000"
        data-aos-delay="800"
      >
        <div className="p-8">
          <h1 className="text-4xl text-delta-green-1200 font-bold mb-6">
            Bize Ulaşın
          </h1>
          <p className="text-xl text-delta-green-1200 mb-8 leading-relaxed">
            Her türlü öneri, talep, eleştiri ve yorumlarınız için hafta içi
            08:00 – 17:00 saatleri arasında bizleri arayabilir ya da e-posta
            adresimiz aracılığıyla bize ulaşabilirsiniz.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-delta-green-1200"
              />
              <p className="pl-4 text-delta-green-1200 text-base">444 00 00</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-delta-green-1200"
              />
              <p className="pl-4 text-delta-green-1200 text-base">
                info@deltarental.com
              </p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="text-delta-green-1200"
              />
              <p className="pl-4 text-delta-green-1200 text-base">
                İstanbul, Türkiye
              </p>
            </div>
          </div>
        </div>
        <div className="bg-delta-green-1000 p-8">
          <h2 className="text-2xl text-white font-bold mb-6">
            Hızlı İletişim Formu
          </h2>
          <form action="#" method="POST" className="w-full">
            <div className="grid grid-cols-1 gap-6 mb-6 ">
              <input
                type="text"
                name="name"
                placeholder="Adınız"
                className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-delta-green-500"
              />
              <input
                type="email"
                name="email"
                placeholder="E-posta Adresiniz"
                className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-delta-green-500"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Mesajınız"
                className="w-full border-2 border-gray-300 p-3 rounded outline-none focus:border-delta-green-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-delta-green-800 text-white p-3 rounded hover:bg-delta-green-900 transition-colors"
            >
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
