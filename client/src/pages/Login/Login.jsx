import React from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./Login.css";
import loginImage from "../../assets/login_image.jpg";

export default function Login() {
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
                <TextInput type="text" className="login-input" />
              </CustomLabel>
            </Form.Group>
            <Form.Group controlId="userPassword">
              <CustomLabel>
                Password
                <TextInput type="password" className="login-input" />
              </CustomLabel>
            </Form.Group>
            <Button
              variant="danger"
              text={"Sign In"}
              className="login-button"
            ></Button>
            <CustomLabel>Don't have an account? Create account</CustomLabel>
          </div>
        </Container>
      </Form>
    </div>
  );
}
