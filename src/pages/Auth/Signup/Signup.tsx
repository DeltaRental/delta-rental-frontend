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
      className="container w-full mx-auto flex justify-center items-center"
      style={{ height: "calc(100vh - 7rem)" }}
    >
      <div className="w-[70%] h-[80%]  rounded-3xl">
        <div className="grid grid-cols-2 p-2 h-full">
          <div className="bg-black bg-opacity-40 grid grid-cols-1 rounded-s-3xl w-full px-10 shadow-[15px_0px_0px_-5px_#000000]">
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                <img
                  className="w-20 h-20 rounded-full shadow-[0px_0px_10px_10px_#f8e61b]"
                  src="https://avatars.githubusercontent.com/u/156099996?s=200&v=4"
                  alt="DeltaLogo"
                />
              </div>

              <div className="flex justify-center  mt-10 text-3xl font-bold text-white">
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
                  <Form className="p-0 shadow-none min-w-[300px] ">
                    <div className="grid grid-cols-2 gap-2">
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
                        className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500 shadow-[0px_0px_10px_5px_#f8e61b]"
                      >
                        Üye Ol
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>

              <div className="flex items-center justify-center space-x-2 my-5">
                <span className="h-px w-16 bg-white"></span>
                <span className="text-white font-normal">or</span>
                <span className="h-px w-16 bg-white"></span>
              </div>

              <div className="mb-7 flex justify-center">
                <p className="text-white flex">
                  Hesabın yok mu?
                  <Link
                    className="text-purple-700 hover:text-purple-700 ms-1"
                    to="/login"
                  >
                    Giriş yap
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-delta-yellow text-white bg-opacity-20 grid grid-cols-1 rounded-e-3xl px-14">
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

export default Signup;
