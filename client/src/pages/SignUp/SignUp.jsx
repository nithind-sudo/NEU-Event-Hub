import React from "react";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import MyToast from "../../components/ui/Toast";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Button from "../../components/ui/Button";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <Form>
        <Container>
          <Form.Group controlId="userFirstName">
            <CustomLabel>
              First Name
              <TextInput
                type="text"
                value={firstName}
                className="login-input"
                placeholder={"First Name..."}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </CustomLabel>
          </Form.Group>

          <Form.Group controlId="userLastName">
            <CustomLabel>
              Last Name
              <TextInput
                type="text"
                value={lastName}
                className="login-input"
                placeholder={"Last Name..."}
                onChange={(e) => setLastName(e.target.value)}
              />
            </CustomLabel>
          </Form.Group>

          <Form.Group controlId="userEmail">
            <CustomLabel>
              Email
              <TextInput
                type="text"
                value={email}
                className="login-input"
                placeholder={"Email..."}
                onChange={(e) => setEmail(e.target.value)}
              />
            </CustomLabel>
          </Form.Group>

          <Form.Group controlId="userPhone">
            <CustomLabel>
              Phone
              <TextInput
                type="text"
                value={phoneNumber}
                className="login-input"
                placeholder={"Phone..."}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </CustomLabel>
          </Form.Group>

          <Form.Group controlId="userPassword">
            <CustomLabel>
              Password
              <TextInput
                type="password"
                value={password}
                className="login-input"
                placeholder={""}
                onChange={(e) => setPassword(e.target.value)}
              />
            </CustomLabel>
          </Form.Group>

          <Form.Group controlId="userConfirmPassword">
            <CustomLabel>
              Confirm Password
              <TextInput
                type="password"
                value={confirmPassword}
                className="login-input"
                placeholder={""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </CustomLabel>
          </Form.Group>

          <Form.Check
            type={"checkbox"}
            id={`default-checkbox}`}
            label={`I agree to the User Agreement and Conditions `}
          />

          <Button
            variant="danger"
            text={"Create Account"}
            className="login-button"
          ></Button>
        </Container>
      </Form>
    </div>
  );
}
