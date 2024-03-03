import React, { useEffect, useLayoutEffect, useState } from "react";
import { MyJwtPayload } from "../../models/JwtTokenPayload/MyJwtPayload";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import axios from "axios";
import { log } from "console";
import { updateUser, userInfo } from "../../store/slices/userSlice";

type Props = {};

const UserInfo = (props: Props) => {
  const [decode, setDecode] = useState<MyJwtPayload>();
  const [credentials, setCredentials] = useState({});

  const userState = useSelector((state: any) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  // const initialValues = {
  //   name: "",
  //   surname: "",
  //   email: "",
  //   password: "",
  //   roles: ["USER"],
  //   gsm: " "
  // };

  const [userInformation, setUserInformation] = useState({
    id: 0,
    name: "",
    surname: "",
    email: "",
    password: "",
    authorities: ["USER"],
    gsm: "",
  });

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
      .min(5, "Şifre minimum 5 karakter uzunluğunda olmalıdır.")
      .max(30),
    gsm: string()
      .required("İsim alanı zorunludur.")
      .min(4, "Şifre minimum 17 karakter uzunluğunda olmalıdır.")
      .max(13),
  });

  const handleLogin = (values: any) => {
    dispatch(updateUser(values));
    //window.location.reload();
  };

  useLayoutEffect(() => {
    let token: string | null = localStorage.getItem("jsonwebtoken");
    if (token) {
      const jwtDecoded = jwtDecode(token) as MyJwtPayload;
      setDecode(jwtDecoded);
      dispatch(userInfo(jwtDecoded.email || ""));
    }
  }, []);

  useEffect(() => {
    setUserInformation((prevState) => ({
      ...prevState,
      id: userState.users.id || 0,
      name: userState.users.name || "",
      surname: userState.users.surname || "",
      email: userState.users.email || "",
      gsm: userState.users.gsm || "",
    }));
  }, [userState.users]);

  console.log("userinfo", userInformation);

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {`Merhaba ${userState.users.name} ${userState.users.surname}`}
      </h3>
      <p className="mb-2">
        Bu sayfadan kişisel bilgilerinizi ve şifrenizi güncelleyebilirsiniz.
      </p>
      <hr />

      <div className="flex justify-center mt-10">
        <Formik
          initialValues={userInformation}
          onSubmit={(values) => {
            console.log("value", values);
            handleLogin(values);
            setCredentials(values);
          }}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          <Form className="p-0 shadow-none min-w-[300px] ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <FormikInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Mailinizi giriniz..."
                />
              </div>
              <div>
                <FormikInput
                  name="gsm"
                  label="Gsm"
                  type="phone"
                  placeholder="Numaranızı giriniz."
                />
              </div>
            </div>

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
                Değişiklikleri kaydet
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UserInfo;
