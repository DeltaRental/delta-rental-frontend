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
          alert('Kullanıcı adı veya Şifre Yanlış. Lütfen tekrar deneyiniz.');
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
      className="container w-full mx-auto flex justify-center items-center"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="w-[70%] h-[80%]  rounded-3xl">
        <div className="grid grid-cols-2 p-2 h-full">
          <div className="bg-delta-green-400 bg-opacity-40 grid grid-cols-1 rounded-s-3xl w-full px-10 shadow-[15px_0px_0px_-5px_#000000]">
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img
                  className="w-20 h-20 rounded-full shadow-[0px_0px_10px_10px_#12372A]"
                  src="https://avatars.githubusercontent.com/u/156099996?s=200&v=4"
                  alt="DeltaLogo"
                />
              </div>

              <div className="flex justify-center mt-10 text-3xl font-bold text-delta-green-400">
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
                  <Form className="p-0 shadow-none min-w-[300px] ">
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
                          className="text-delta-green-1000 hover:text-delta-green-400 font-bold"
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
                <span className="h-px w-16 bg-delta-green-400"></span>
                <span className="text-delta-green-400 font-normal">or</span>
                <span className="h-px w-16 bg-delta-green-400"></span>
              </div>

              <div className="mb-7 flex justify-center">
                <p className="text-delta-green-400 flex">
                  Hesabın yok mu?
                  <Link
                    className="text-delta-green-1000 hover:text-delta-green-400 ms-1 font-bold"
                    to="/signup"
                  >
                    Üye ol
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-delta-green-800 text-delta-green-400 bg-opacity-40 grid grid-cols-1 rounded-e-3xl px-14">
            <div className="flex flex-col justify-center">
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
