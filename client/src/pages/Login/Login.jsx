import React from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./Login.css";
import loginImage from "../../assets/login_image.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import MyToast from "../../components/ui/Toast";


const LOGIN_URL = "http://localhost:3000/v1/session";

export default function Login({ ...props }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL, { email, password });
      console.log(` *** Response from Login End Point : ${response}`);
      if (response.data.success) {
        props.handleLogin();
        navigate("/main");
      } else {
        setError("Invalid Email or Address");
        setShowAlert(true);
      }
    } catch (e) {
      console.log("**** Error while logging in:", e);
      setError("Invalid Email or Address");
      setShowAlert(true);
    }
  };

  return (
    <div className="login-page">
      <div className="flex-column">
        <ImageComponent src={loginImage} className="image-fit" />
      </div>

      <Form className="login-content">
        <Container>
          <div className="login-container">
            <Form.Group controlId="userEmail">
              <CustomLabel>
                Username
                <TextInput
                  type="text"
                  value={email}
                  className="login-input"
                  placeholder={"Email..."}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CustomLabel>
            </Form.Group>
            <Form.Group controlId="userPassword">
              <CustomLabel>
                Password
                <TextInput
                  type="password"
                  placeholder={"Password..."}
                  value={password}
                  className="login-input"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </CustomLabel>
            </Form.Group>
            <Button
              variant="danger"
              text={"Sign In"}
              onClick={handleSignIn}
              className="login-button"
            ></Button>
            <CustomLabel>Don't have an account? Create account</CustomLabel>
          </div>
        </Container>
      </Form>
      {showAlert && (
        <MyToast
          bg={"danger"}
          show={showAlert}
          onClose={() => setShowAlert(false)}
          message={error}
        />
      )}
    </div>
  );
}
