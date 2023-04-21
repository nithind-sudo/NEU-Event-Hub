import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import "./Styles/Checkout.css";
import { fetchSession, fetchUserInfo } from "../../apiClient";
import { EventManagementState } from "../../contexts/context";
import { ACTIONS } from "../../contexts/constants";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const Checkout = () => {
  let location = useLocation();
  console.log(location);

  const [selectedNavItem, setSelectedNavItem] = useState("profile");
  const { state, dispatch } = EventManagementState();
  console.log("Current State inside checkout Page : ", state);
  const [firstName, setFirstName] = useState(state.first_name);
  const [lastName, setLastName] = useState(state.last_name);
  const [phoneNumber, setPhoneNumber] = useState(state.phone_number);
  const [username, setUsername] = useState(state.username);
  const [role, setRole] = useState(state.role);
  let navigate = useNavigate();

  const updateUserData = () => {
    navigate("/account");
  };
  const payNow = async (token) => {
    console.log(token);
    await axios
      .post("http://localhost:3000/stripe/payment", {
        username: username,
        event: [state.event],
        amount: state.ticketPrice * state.numberOfSeats,
        token: token,
      })
      .then((response) => {
        if (response.status == 200) {
          // Add a row to payments table
          
          navigate("/successPayment", {state:{
            username: username,
            event: [state.event],
            numberOfSeats: state.numberOfSeats
          }});
        } else {
          navigate("/badPayment");
        }
      });
  };
  useEffect(() => {
    // console.log("Hitting userInfo for user_id : ", state.user_id);
    fetchSession().then((sessionResponse) => {
      if (sessionResponse.data.success) {
        fetchUserInfo(sessionResponse.data.user_id)
          .then((response) => {
            // console.log("*** Response from GET User API : ", response);
            const userProfile = response.data[0];
            dispatch({
              type: ACTIONS.GET_USER,
              first_name: userProfile.first_name,
              last_name: userProfile.last_name,
              phone_number: userProfile.phone_number,
              role: userProfile.role,
              created_on: userProfile.created_time,
              events_booked: userProfile.events_booked,
              favorites: userProfile.favorites,
            });

            setFirstName(userProfile.first_name);
            setLastName(userProfile.last_name);
            setPhoneNumber(userProfile.phone_number);
            setRole(userProfile.role);
            setUsername(userProfile.username);
          })
          .catch((error) => {
            throw error;
          });
      } else {
        dispatch({ type: ACTIONS.LOG_OUT });
        navigate("/login");
      }
    });
  }, [firstName, lastName, phoneNumber, username, role]);
  return (
    <div>
      <Navbar />
      <div className="my-5 py-5 pageHeightSet">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div class="card text-dark container py-3 my-2">
                <div class="card-body">
                  <div class="h6 card-title text-center">User Information</div>
                  <div class="card-text">
                    <div className="container">
                      <div className="row">
                        <span className="my-1">
                          <b>Full Name: </b>
                          <span>
                            {firstName} {lastName}
                          </span>
                        </span>
                      </div>
                      <div className="row">
                        <span className="my-1">
                          <b>Mobile Number: </b>
                          <span>{phoneNumber}</span>
                        </span>
                      </div>
                      <div className="row">
                        <span className="my-1">
                          <b>Username: </b>
                          <span>{username}</span>
                        </span>
                        <span>
                          Ticket will be delivered to this username email and
                          mobile number
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="container text-center">
                    <button
                      class="btn btn-warning my-1"
                      onClick={updateUserData}>
                      Update Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div class="card text-dark container py-3">
                <img
                  src="https://images.ctfassets.net/fzn2n1nzq965/3AGidihOJl4nH9D1vDjM84/9540155d584be52fc54c443b6efa4ae6/homepage.png?q=80"
                  class="card-img-top"
                  alt="Stripe Logo"
                />
                <div class="card-body">
                  <div class="h6 card-title text-center">
                    Payments are powered by Stripe
                  </div>
                  <div class="display-6 card-title">Product Details</div>
                  <div class="card-text">
                    <div className="container">
                      <div className="row">
                        <span className="my-1">
                          <b>Event Title: </b>
                          <span>{state.eventName}</span>
                        </span>
                      </div>
                      <div className="row">
                        <span className="my-1">
                          <b>Event ID: </b>
                          <span>{state.eventID}</span>
                        </span>
                      </div>
                      <div className="row">
                        <span className="my-1">
                          <b>Event Date: </b>
                          <span>{state.eventDate}</span>
                        </span>
                      </div>
                      <div className="row">
                        <span className="my-1">
                          <b>Number of Tickets: </b>
                          <span>{state.numberOfSeats}</span>
                        </span>
                      </div>
                      <div className="row">
                        <span className="my-1">
                          <b>Total Price: </b>
                          <span>
                            {state.ticketPrice *
                              state.numberOfSeats}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="container text-center">
                    <StripeCheckout
                      stripeKey="pk_test_51MzG5tL5TqKfooRTnFTHU3azUtRcj0p5LddkCevEQSfxAFduTbnpJpdDToDDSJ6RYnutIV4yxdb4FOySiIfovz8E00KSBrXtL1" //public key
                      label="Pay and Register"
                      name="Pay with Card"
                      billingAddress
                      shippingAddress
                      amount={
                        state.ticketPrice *
                        state.numberOfSeats *
                        100
                      }
                      description={`Your total amount is \$${(
                        state.ticketPrice *
                        state.numberOfSeats
                      ).toString()}`}
                      token={payNow}
                    />
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

export default Checkout;
