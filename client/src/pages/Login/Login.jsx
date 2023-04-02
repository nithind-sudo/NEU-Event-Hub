import React from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./Login.css";
import loginImage from '../../assets/login_image.jpg'

export default function Login() {
  return (
    <div className="login-container">
      <div className="flex-column">
        <ImageComponent src={loginImage} />
      </div>

      <Form>
        <Container className="login-content">
          <Form.Group controlId="userEmail">
            <CustomLabel>
              Username
              <TextInput type="text" />
            </CustomLabel>
          </Form.Group>
          <Form.Group controlId="userPassword">
            <CustomLabel>
              Password
              <TextInput type="password" />
            </CustomLabel>
          </Form.Group>
          <Button variant="primary" text={"Login"}></Button>
        </Container>
      </Form>
    </div>
  );
}
