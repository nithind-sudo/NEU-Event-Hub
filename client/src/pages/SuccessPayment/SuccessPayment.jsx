import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import successPayment from "../../assets-pack/successPayment/successPayment.jpeg";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  let navigate = useNavigate();
  const getRegisteredEvents = () => {
    navigate("/registeredEvents");
  };
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
