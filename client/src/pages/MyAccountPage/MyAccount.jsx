import React from "react";
// import ImageComponent from "../../components/ui/ImageComponent";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./MyAccount.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyToast from "../../components/ui/Toast";
import Navbar from "../../components/Navbar/Navbar";
import  Card  from "../../components/ui/Card";
export default function MyAccount() {
  const navigate = useNavigate();
  let t = "Account Information!";
  let info = "Hii Here is your information"
  let user = " kaustubhlawale4@gmail.com"
  let phone = "8573905510"
  function handleClick1() {
    navigate('/editprofile');
  }
    return (
       <>
       <Navbar />
       <div className="myAccount-page">
        <Form>
        <CustomLabel className="Account-label">Account Overview</CustomLabel>
        <Card className= "ticket-card"
          title= {t}
          handleClick1={handleClick1}
          username = {user}
          pnumber = {phone}
          Ctitle = "title"
           >
             <Button 
              variant="success"
              text={"Edit Profile"}
              onClick={handleClick1}
             ></Button>
        </Card>
        </Form>
        </div>  
        </>
    )
  }
  