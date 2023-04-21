import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import badPayment from "../../assets-pack/badPayment/badPayment.jpeg";
import "./Styles/BadPayment.css";
import { useNavigate } from "react-router-dom";

const BadPayment = () => {
  let navigate = useNavigate();
  const getHome = ()=>{
    navigate("/main");
  }
  return (
    <div>
      <Navbar />
      <div className="my-5 pageHeightSet">
        <div className="container text-center">
          <img src={badPayment} alt="Bad Payment" className="payment" />
          <br/><br/>
          <button className="btn btn-primary" onClick={getHome}>Home</button>
        </div>
      </div>
    </div>
  );
};

export default BadPayment;
