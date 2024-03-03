import React, { useState } from "react";
import { Box, Button, Checkbox, colors, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FormikInput from "../../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Link from "../../../components/CustomLink/Link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setIsLoggedIn, userInfo } from "../../../store/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "../../../models/JwtTokenPayload/MyJwtPayload";
import { AuthenticateRequest } from "../../../models/auth/requests/authenticateRequest";
import { authAuthenticate } from "../../../store/slices/authSlice";
import authService from "../../../services/authService";

type Props = {};

const Login = (props: Props) => {
  const [credentials, setCredentials] = useState({});
  const rentalState = useSelector((state: any) => state.rental);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = object({
    email: string().email("Geçersiz email").required("Mail boş geçilemez."),
    password: string()
      .required("Şifre alanı zorunludur.")
      .min(5, "Şifre minimum 5 karakter uzunluğunda olmalıdır.")
      .max(30),
  });

  const handleLogin = (values: AuthenticateRequest) => {
    authService.authenticate(values).then(
      (response) => {
        console.log(response);
        if (!response) {
          alert("Kullanıcı adı veya Şifre Yanlış. Lütfen tekrar deneyiniz.");
          //localStorage.removeItem('jsonwebtoken'); // Anahtarı sil
          //navigate('/login'); // useNavigate ile giriş sayfasına yönlendir
        } else {
          const token = response.data.token;
          localStorage.setItem("jsonwebtoken", token);
          dispatch(setIsLoggedIn(true));

          const decoded = jwtDecode(token!) as MyJwtPayload;
          if (decoded.role?.includes("ADMIN")) {
            localStorage.setItem("isLoggedIn", "true");
            navigate("/admin");
          } else {
            navigate(location.state?.from || "/");
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div
      className="container w-full mx-auto flex justify-center items-center md:pt-2 md:pb-20 py-10 h-screen"
      // style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="md:w-[70%] md:h-[80%] w-[80%] h-[80%] ">
        <div className="grid grid-cols-1 md:grid-cols-2  h-full ">
          <div
            className="bg-delta-green-400  grid grid-cols-1  md:rounded-s-3xl w-full md:px-10 px-2 md:shadow-[15px_0px_0px_-5px_#000000]"
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
                className="flex justify-center "
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

              <div className="flex justify-center mt-10 text-3xl font-bold text-delta-green-1000">
                <p>GİRİŞ YAP</p>
              </div>

              <div className="flex justify-center mt-10 ">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values) => {
                    handleLogin(values);
                    setCredentials(values);
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

                    <div className="flex items-center justify-between">
                      <div className="text-sm ml-auto pb-3 mb-2">
                        <a
                          href="#"
                          className="text-delta-green-1000 hover:text-delta-green-800 font-bold"
                        >
                          Şifremi unuttum
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center bg-delta-green-1000 hover:bg-delta-green-600 text-delta-green-400 hover:text-delta-green-1000 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500 shadow-[0px_0px_10px_5px_#ddf051]"
                      >
                        Giriş Yap
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
                  Hesabın yok mu?
                  <Link
                    className="text-delta-green-1000 hover:text-delta-green-800 ms-1 font-bold"
                    to="/signup"
                  >
                    Üye ol
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

export default Login;
