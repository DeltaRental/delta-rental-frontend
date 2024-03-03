import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  Stripe,
  StripeElements,
  StripePaymentElementOptions,
} from "@stripe/stripe-js";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addRental } from "../../store/slices/rentalSlice";
import { jwtDecode } from "jwt-decode";
import { MyJwtPayload } from "../../models/JwtTokenPayload/MyJwtPayload";
import FormikInput from "../../components/FormikInput/FormikInput";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import dayjs from "dayjs";

export const CheckoutForm = () => {
  const rentalState = useSelector((state: any) => state.rental);
  const userState = useSelector((state: any) => state.user);
  const branchState = useSelector((state: any) => state.branch);
  const carsState = useSelector((state: any) => state.car);
  const dispatch = useDispatch<AppDispatch>();

  const [decode, setDecode] = useState<MyJwtPayload>();
  const [userInformation, setUserInformation] = useState({
    id: 0,
    name: "",
    surname: "",
    email: "",
    authorities: ["USER"],
    gsm: "",
  });

  const rentalData = {
    startDate: rentalState.selectedStartDate,
    endDate: rentalState.selectedEndDate,
    //startLocation: branchState.selectedBranch.name,
    carId: carsState.selectedCar.id,
    userId: decode?.id,
    employeeId: 1,
  };

  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let token: string | null = localStorage.getItem("jsonwebtoken");
    if (token) {
      const jwtDecoded = jwtDecode(token) as MyJwtPayload;
      setDecode(jwtDecoded);
      // dispatch(userInfo(jwtDecoded.email || ""));
    }
  }, []);

  console.log(rentalData);
  console.log(decode);
  console.log(carsState);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Burası ödemeden sonra yönlenicek sayfa path' i
        return_url: "http://localhost:3000/payment/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message); // burada ünlem işareti kullandık
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const clickButton = () => {
    dispatch(addRental(rentalData));
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
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
      .min(5, "Şifre minimum 5 karakter uzunluğunda olmalıdır.")
      .max(30),
    gsm: string()
      .required("İsim alanı zorunludur.")
      .min(4, "Şifre minimum 17 karakter uzunluğunda olmalıdır.")
      .max(13),
  });
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

  const handleLogin = (values: any) => {
    //window.location.reload();
  };
  return (
    // <form id="payment-form" onSubmit={handleSubmit}>
    //   <PaymentElement id="payment-element" options={paymentElementOptions} />
    //   <button onClick={clickButton} disabled={isLoading || !stripe || !elements} id="submit">
    //     <span id="button-text">
    //       {isLoading ? <Spinner/> : "Pay now"}
    //     </span>
    //   </button>
    //   {/* Show any error or success messages */}
    //   {message && <div id="payment-message">{message}</div>}
    // </form>
    <div className="container mx-auto min-h-screen">
      <div className="grid grid-cols-12 min-h-screen">
        <div className="col-span-12 lg:col-span-8 min-h-screen">
          <div
            className=""
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
          >
            <div className=" p-6 min-h-screen">
              {/* Araç Bilgileri */}

              <div className="p-6 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white">
                <h2 className="font-bold text-2xl mb-4 text-delta-green-1200">
                  Kiralama Detayları
                </h2>
                <div className="flex flex-col items-center justify-center mb-5">
                  <img
                    className="w-[610px] h-[243px] object-contain rounded-lg mb-4 "
                    src={carsState.selectedCar.imageUrl}
                    alt="Araç Resmi"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    data-aos-easing="ease-in-sine"
                    data-aos-delay="1000"
                  />
                  <div className="text-2xl text-delta-green-1200 font-medium">{`${carsState.selectedCar.model.brandName} ${carsState.selectedCar.model.name}`}</div>
                </div>

                <div className="grid grid-cols-12  text-center ">
                  <div className="col-span-12 md:col-span-4 ">
                    <div className="">
                      <h3 className="text-lg font-semibold text-delta-green-1200 ">
                        Araç Bilgileri
                      </h3>
                      <p className="text-gray-900">
                        Marka: {carsState.selectedCar.model.brandName}
                      </p>
                      <p className="text-gray-900">
                        Model: {carsState.selectedCar.model.name}
                      </p>
                      <p className="text-gray-900">
                        Yıl: {carsState.selectedCar.year}
                      </p>
                      <p className="text-gray-900">
                        Kilometre: {carsState.selectedCar.kilometer}
                      </p>
                      <p className="text-gray-900">
                        Günlük Fiyat: {carsState.selectedCar.dailyPrice}₺
                      </p>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="">
                      <h3 className="text-lg font-semibold text-delta-green-1200">
                        Kiralama Tarihleri
                      </h3>
                      <p className="text-gray-900">
                        Alış Tarihi: {rentalState.selectedStartDate}
                      </p>
                      <p className="text-gray-900">
                        Teslim Tarihi: {rentalState.selectedEndDate}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <div className="">
                      <h3 className="text-lg font-semibold text-delta-green-1200">
                        Bulunduğu Şube
                      </h3>
                      <p className="text-gray-900">
                        Şehir: {branchState.selectedBranch.city}
                      </p>
                      <p className="text-gray-900">
                        Adı: {branchState.selectedBranch.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Araç Bilgileri */}

              {/* Kullanıcı Bilgileri */}
              <div className="p-6 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white mt-3">
                <div>
                  <div className="flex flex-col justify-center">
                    <h2 className="font-bold text-2xl mb-4 text-delta-green-1200">
                      Kullanıcı Detayları
                    </h2>
                    <Formik
                      initialValues={userInformation}
                      onSubmit={(values) => {
                        console.log("value", values);
                        handleLogin(values);
                      }}
                      validationSchema={validationSchema}
                      enableReinitialize={true}
                    >
                      <Form className="p-0 shadow-none min-w-[100px] ">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                      </Form>
                    </Formik>
                  </div>
                </div>
              </div>
              {/* Kullanıcı Bilgileri */}

              {/* Ödeme Bilgileri */}

              <div>
                <div className="p-6 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white mt-3">
                  <h2 className="font-bold text-2xl mb-4 text-delta-green-1200">
                    Ödeme Bilgileri
                  </h2>
                  <div className="flex justify-center">
                    <form
                      id="payment-form"
                      onSubmit={handleSubmit}
                      className="flex flex-col justify-center md:max-w-[70%]  "
                    >
                      <PaymentElement
                        id="payment-element"
                        className="mb-6 w-full "
                        options={paymentElementOptions}
                      />
                      <button
                        type="submit"
                        id="submit"
                        onClick={clickButton}
                        className="bg-blue-500 hover:bg-blue-700 w-full text-deltabg-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform "
                        disabled={isLoading || !stripe || !elements}
                      >
                        {isLoading ? "İşleniyor..." : "Şimdi Öde"}
                      </button>
                      {message && (
                        <div id="payment-message" className="text-red-500 mt-4">
                          {message}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              {/* Ödeme Bilgileri */}
            </div>
          </div>
        </div>

        <div
          className="col-span-12 lg:col-span-4 "
          data-aos="fade-left"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <div className="min-h-[400px] ">
            <div className=" p-6 min-h-full">
              <div className="flex flex-col  p-6 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] bg-white min-h-[400px]">
                <div>
                  <h2 className="font-bold text-2xl mb-4 text-delta-green-1200 text-center ">
                    Kiralama Özeti
                  </h2>
                </div>
                <div className="min-h-[300px]">
                  <div className="flex justify-between text-xl ">
                    <div className="">{`Günlük fiyat`}</div>
                    <div className="">
                      {`${dayjs(rentalState.selectedEndDate).diff(
                        dayjs(rentalState.selectedStartDate),
                        "day"
                      )} Gün x ${carsState.selectedCar.dailyPrice}₺`}
                    </div>
                    <div className="">
                      {carsState.selectedCar.dailyPrice *
                        dayjs(rentalState.selectedEndDate).diff(
                          dayjs(rentalState.selectedStartDate),
                          "day"
                        )}
                      ₺
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between mt-3 text-2xl">
                  <div>ARA TOPLAM</div>
                  <div>
                    {carsState.selectedCar.dailyPrice *
                      dayjs(rentalState.selectedEndDate).diff(
                        dayjs(rentalState.selectedStartDate),
                        "day"
                      )}
                    TL
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
