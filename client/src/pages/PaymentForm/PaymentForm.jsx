import React from "react";
import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckOutForm/CheckoutForm";
import {
  fetchPaymentConfig,
  createPaymentIntent,
  createPayment,
} from "../../apiClient";

const PaymentForm = () => {
  console.log("Inside Payment Form");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchPaymentConfig().then((response) => {
      const { publishableKey } = response.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    createPaymentIntent().then((response) => {
      const { clientSecretFromAPI } = response.data;
      setClientSecret(clientSecretFromAPI);
    });
  }, []);

  const handleSuccess = async (data) => {
    try {
      const response = await createPayment(data);
      console.log("Payment successful:", response);
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  return (
    <React.Fragment>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onSuccess={handleSuccess} />
        </Elements>
      )}
    </React.Fragment>
  );
};

export default PaymentForm;
