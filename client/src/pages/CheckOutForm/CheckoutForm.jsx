import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ onSuccess, eventId, user_id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occured.");
      }
    } else {
      onSuccess({
        paymentIntentId: paymentIntent.id,
        // Add other required data such as eventId and user_id
        eventId,
        user_id,
      });

      // Navigate to the desired page after successful payment
      navigate("/main");
    }

    setIsProcessing(false);

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    // if (error) {
    //   console.log("[error]", error);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    //   // TODO: Process payment
    //   // After successful payment, navigate to main page
    //   navigate("/");
    // }
  };

  return (
    <>
      <Form id="payment-form" onSubmit={handleSubmit}>
        <Container>
          <PaymentElement id="payment-element" />
          <button disabled={isProcessing || !stripe || !elements} id="submit">
            <span id="button-text">
              {isProcessing ? "Processing ... " : "Pay now"}
            </span>
          </button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </Container>
      </Form>
    </>
  );
};

export default CheckoutForm;
