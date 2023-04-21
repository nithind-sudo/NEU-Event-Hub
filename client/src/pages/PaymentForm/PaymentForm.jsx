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
import { EventManagementState } from "../../contexts/context";

const PaymentForm = () => {
  console.log("Inside Payment Form");
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { state, dispatch } = EventManagementState();

  useEffect(() => {
    fetchPaymentConfig().then((response) => {
      const { publishableKey } = response.data;
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    // Need to add amount to call createPaymentIntent()
    createPaymentIntent(state.selectedEvent.price).then((response) => {
      console.log(response);
      const { clientSecret } = response.data;
      console.log(clientSecret);
      setClientSecret(clientSecret);
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
