import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Payment = () => {
    const payNow = async (token)=>{
        const response = await axios({
            url: "http://localhost:3000/stripe/payment",
            method: 'post',
            data: {
                amount: 1,
                token,
            }
        });
        if(response.status == 200) {
            console.log("Your Payment is successful");
        }
    }
  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51MzG5tL5TqKfooRTnFTHU3azUtRcj0p5LddkCevEQSfxAFduTbnpJpdDToDDSJ6RYnutIV4yxdb4FOySiIfovz8E00KSBrXtL1" //public key
        label="Proceed to Pay"
        name="Pay with Card"
        billingAddress
        shippingAddress
        amount={1}
        description="Your total amount is 1"
        token={payNow}
      />
    </div>
  );
};

export default Payment;
