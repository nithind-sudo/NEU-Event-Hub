import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Replace with your own Stripe public key
const stripePromise = loadStripe("pk_test_51MzAUMDqgKv6XfDoCzej2pjscQZAi2I12D7t7vyjscJamt8xcKpTVrowwYz6C75hYGj84vv9fqL83pUxNmRg10G200qDJwlHlj");

const PaymentForm = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentForm;
