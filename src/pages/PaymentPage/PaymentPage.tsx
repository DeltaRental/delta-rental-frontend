import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/PaymentCheckoutForm/CheckoutForm";
import "../PaymentPage/PaymentPage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../../store/store";
import { addRental } from "../../store/slices/rentalSlice";
import { useNavigate } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51OecbiDJwyPdNC8AxXpr0WRdPjv8c4gBc22SV3VcfHgXc4MRLeFNw4j0lsucMdUZ14JpdH0J0r9FpoPIFLCModpK00GqqhNjgY"
);

interface PaymentPageProps {}

const PaymentPage: React.FC<PaymentPageProps> = () => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState<string>("");


  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/api/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json",
      Authorization: 'Bearer ' + localStorage.getItem('jsonwebtoken')
      },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        alert('Oturum süreniz dolmuş olabilir. Lütfen tekrar giriş yapınız.');
      localStorage.removeItem('jsonwebtoken'); // Anahtarı sil
      navigate('/login'); // useNavigate ile giriş sayfasına yönlendir
      })
  }, []);

 



  const appearance = {
    theme: "stripe" as const,
  };
  const options = {
    clientSecret,
    appearance,
  };

  
    //console.log(rentalData);
  
  

  return (
      <div className="">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
  );
};

export default PaymentPage;
