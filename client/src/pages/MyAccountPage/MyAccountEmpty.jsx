import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./MyAccount.css";
import { useLocation, useNavigate } from "react-router-dom";

const MyAccountEmpty = () => {
  const location = useLocation();
  let navigate = useNavigate();
  console.log(location);
  useEffect(()=>{
    if (location.state.navigateBackTo == "account") {
        navigate("/account");
      }
  }, []);
  return (
    <div className="py-5 makeBackgroundForMyAccount">
      <Navbar />
    </div>
  );
};

export default MyAccountEmpty;
