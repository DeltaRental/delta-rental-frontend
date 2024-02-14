import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements, StripePaymentElementOptions } from "@stripe/stripe-js";
import OverlayLoader from "../OverlayLoader/OverlayLoader";
import { Spinner } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addRental } from "../../store/slices/rentalSlice";

export const CheckoutForm = () => {
  const rentalState = useSelector((state: any) => state.rental);
  const branchState = useSelector((state: any) => state.branch);
  const carsState = useSelector((state: any) => state.car);
  const dispatch = useDispatch<AppDispatch>();
  const rentalData = {
      startDate: rentalState.selectedStartDate,
      endDate: rentalState.selectedEndDate,
      //startLocation: branchState.selectedBranch.name,
      carId: carsState.selectedCar.id,
      customerId: 5,
      employeeId: 1
    };

  
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  
 
    console.log(rentalData);
  
  
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
        return_url: "http://localhost:3000/payment",
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
    dispatch(addRental(rentalData))
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button onClick={clickButton} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <Spinner/> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};


export default CheckoutForm;