import React from "react";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import "./MyAccount.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyToast from "../../components/ui/Toast";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/ui/Card";
import Footer from "../../components/Layout/Footer";

export default function MyAccount({ handlelogout }) {
  const navigate = useNavigate();
  let t = "Account Information!";
  let info = "Hii Here is your information";
  let user = " kaustubhlawale4@gmail.com";
  let phone = "8573905510";
  function handleClick1() {
    navigate("/editprofile");
  }
  return (
    <>
      <Navbar handlelogout={handlelogout} />
      <Container>
        <div className="myAccount-page">
          <Form>
            <CustomLabel className="Account-label">
              Account Overview
            </CustomLabel>
            <Card
              className="ticket-card"
              title={t}
              handleClick1={handleClick1}
              username={user}
              pnumber={phone}
              Ctitle="title"
            >
              <Button
                variant="success"
                text={"Edit Profile"}
                onClick={handleClick1}
              ></Button>
            </Card>
          </Form>
        </div>
      </Container>

      <Footer />
    </>
  );
}
