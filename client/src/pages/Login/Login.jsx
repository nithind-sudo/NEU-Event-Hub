import React from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

export default function Login() {
  return (
    <div className="login-container">
      <ImageComponent />
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
          <Button variant="primary" text={"Login"} ></Button>
        </Container>
      </Form>
    </div>
  );
}
