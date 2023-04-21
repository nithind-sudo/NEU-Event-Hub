import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Form, FormGroup, Alert } from "react-bootstrap";
import "./PaymentForm.css";

const PaymentForm = ({ eventInfo }) => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setIsLoading(false);
      setPaymentError(error.message);
    } else {
      const { id } = paymentMethod;
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: eventInfo.price * 100, // amount in cents
          eventId: eventInfo._id,
          paymentMethodId: id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsLoading(false);
        setPaymentSuccess(true);
      } else {
        setIsLoading(false);
        setPaymentError("Payment failed. Please try again later.");
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </FormGroup>
      <Button type="submit" disabled={!stripe || isLoading}>
        Pay ${eventInfo.price}
      </Button>
      {paymentError && <Alert variant="danger">{paymentError}</Alert>}
      {paymentSuccess && <Alert variant="success">Payment successful!</Alert>}
    </Form>
  );
};

export default PaymentForm;
