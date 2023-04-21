import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import successPayment from "../../assets-pack/successPayment/successPayment.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SuccessPayment = () => {
  let navigate = useNavigate();
  let location = useLocation();
  location.state.event[0].numberOfTickets = location.state.numberOfSeats;
  const getRegisteredEvents = () => {
    navigate("/registeredEvents");
  };
  useEffect(() => {
    axios.post("http://localhost:3000/stripe/addEventToUser", {
      username: location.state.username,
      event: location.state.event
    }).then(response=>console.log(response));
  }, []);
  return (
    <div>
      <Navbar />
      <div className="my-5 pageHeightSet">
        <div className="container text-center">
          <img src={successPayment} alt="Success Payment" className="payment" />
          <br />
          <br />
          <button className="btn btn-primary" onClick={getRegisteredEvents}>
            Registered Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
