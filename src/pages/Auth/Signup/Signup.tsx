import React, { useState } from "react";
import { Box, Button, Checkbox, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FormikInput from "../../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Link from "../../../components/CustomLink/Link";
import { RegisterRequest } from "../../../models/auth/requests/registerRequest";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import { authRegister } from "../../../store/slices/authSlice";
import authService from "../../../services/authService";

type Props = {};

const Signup = (props: Props) => {
  // const [credentials, setCredentials] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    name: "",
    surname: "",
    gsm: " ",
    email: "",
    password: "",
    authorities: ["USER"],
  };

  const validationSchema = object({
    name: string()
      .required("İsim alanı zorunludur.")
      .min(2, "İsim minimum 2 karakter uzunluğunda olmalıdır.")
      .max(50),
    surname: string()
      .required("Soyad alanı zorunludur.")
      .min(2, "Soyad minimum 2 karakter uzunluğunda olmalıdır.")
      .max(50),
    email: string().email("Geçersiz email").required("Mail boş geçilemez."),
    password: string()
      .required("Şifre alanı zorunludur.")
      .min(5, "Şifre minimum 5 karakter uzunluğunda olmalıdır.")
      .max(30),
  });

  const handleLogin = (values: RegisterRequest) => {
    authService.register(values).then(
      (response) => {
        console.log(response);
        navigate("/login");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div
      className="container w-full mx-auto flex justify-center items-center md:pt-2 md:pb-20 py-0 h-screen"
      // style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="md:w-[70%] md:h-[80%] w-[80%] h-[80%]">
        <div className="grid grid-cols-1 md:grid-cols-2  h-full ">
          <div
            className="bg-delta-green-400 grid grid-cols-1 md:rounded-s-3xl w-full md:px-10 px-2 md:shadow-[15px_0px_0px_-5px_#000000]"
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <div
              className="flex flex-col justify-center"
              data-aos="fade-down"
              data-aos-duration="1500"
              data-aos-easing="ease-in-sine"
              data-aos-delay="500"
            >
              <div
                className="flex justify-center"
                data-aos="flip-left"
                data-aos-duration="1500"
                data-aos-easing="ease-in-sine"
                data-aos-delay="800"
              >
                <img
                  className="md:w-40 md:h-40 w-20 h-20"
                  src="http://res.cloudinary.com/dxav6uhnu/image/upload/v1709388157/pcyuu3lgcvm96ks2p5c0.png"
                  alt="DeltaLogo"
                />
              </div>

              <div className="flex justify-center  mt-10 text-3xl font-bold text-delta-green-1000">
                <p>ÜYE OL</p>
              </div>

              <div className="flex justify-center mt-10 ">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    handleLogin(values);
                    // setCredentials(values);
                  }}
                  validationSchema={validationSchema}
                >
                  <Form
                    className="p-0 shadow-none min-w-[100px] "
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <FormikInput
                          name="name"
                          label="Ad"
                          type="text"
                          placeholder="Adınızı giriniz..."
                        />
                      </div>
                      <div>
                        <FormikInput
                          name="surname"
                          label="Soyad"
                          type="text"
                          placeholder="Soyadınızı giriniz..."
                        />
                      </div>
                    </div>
                    <FormikInput
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Mailinizi giriniz..."
                    />
                    <FormikInput
                      name="password"
                      label="Şifre"
                      type="password"
                      placeholder="Şifrenizi giriniz..."
                    />

                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full flex justify-center bg-delta-green-1000 hover:bg-delta-green-600 text-delta-green-400 hover:text-delta-green-1000 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500 shadow-[0px_0px_10px_5px_#ddf051]"
                      >
                        Üye Ol
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>

              <div className="flex items-center justify-center space-x-2 my-5">
                <span
                  className="h-px w-16 bg-delta-green-1000"
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-sine"
                  data-aos-delay="800"
                ></span>
                <span
                  className="text-delta-green-1000 font-normal"
                  data-aos="fade-down"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-sine"
                  data-aos-delay="800"
                >
                  or
                </span>
                <span
                  className="h-px w-16 bg-delta-green-1000"
                  data-aos="fade-left"
                  data-aos-duration="1500"
                  data-aos-easing="ease-in-sine"
                  data-aos-delay="800"
                ></span>
              </div>

              <div className="mb-7 flex justify-center">
                <p className="text-delta-green-1000 flex">
                  Hesabın var mı?
                  <Link
                    className="text-delta-green-1000 hover:text-delta-green-800 ms-1 font-bold"
                    to="/login"
                  >
                    Giriş yap
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div
            className="hidden md:bg-delta-green-800 md:text-delta-green-400 md:bg-opacity-50 md:grid md:grid-cols-1 md:rounded-e-3xl md:px-14 md:shadow-[8.0px_0.0px_6.0px_rgba(0,0,0,0.38)]"
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-easing="ease-in-sine"
          >
            <div
              className="flex flex-col justify-center"
              data-aos="fade-left"
              data-aos-duration="1500"
              data-aos-easing="ease-in-sine"
              data-aos-delay="800"
            >
              <p className="text-6xl flex justify-center">Araç Kirala</p>
              <p className="mt-10 text-xl flex justify-center">
                İstediğin aracı Delta Rental ile kirala.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
