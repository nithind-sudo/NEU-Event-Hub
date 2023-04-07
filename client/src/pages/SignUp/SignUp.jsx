import React from "react";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import MyToast from "../../components/ui/Toast";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../../components/ui/Button";
import { useState } from "react";
import "./SignUp.css";
import { signUp } from "../../apiClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [ alertClass, setAlertClass ] = useState('danger');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // TODO Form Validation code should be written here
    // Call the user creation end point
    // Need to mention the class to show if the post was successful
    const payload = {
      first_name: firstName,
      last_name: lastName,
      username: email,
      phone_number: phoneNumber,
      password,
    };
    try {
      const response = await signUp(payload);
      console.log(` *** Response from SignUp End Point : ${response.data}`);
      if (response.data.success) {
        setShowAlert(true);
        setAlertClass("success");
        setError("Account Created Successfully!!!")
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setAlertClass("Danger");
        setError("Invalid Data In Form");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertClass("Danger");
      setError("Invalid Data In Form");
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Form>
        <Container>
          {/* <Row>
            <h3>Get Started Now!!! </h3>
          </Row> */}
          <Row className="justify-content-center">
            <Col>
              <Form.Group controlId="userFirstName">
                <CustomLabel>
                  First Name
                  <TextInput
                    type="text"
                    value={firstName}
                    className="login-input"
                    // placeholder={"First Name..."}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </CustomLabel>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="userLastName">
                <CustomLabel>
                  Last Name
                  <TextInput
                    type="text"
                    value={lastName}
                    className="login-input"
                    // placeholder={"Last Name..."}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </CustomLabel>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group controlId="userEmail">
              <CustomLabel>
                Email
                <TextInput
                  type="text"
                  value={email}
                  className="login-input"
                  // placeholder={"Email..."}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CustomLabel>
            </Form.Group>
          </Row>
          <Form.Group controlId="userPhone">
            <CustomLabel>
              Phone
              <TextInput
                type="text"
                value={phoneNumber}
                className="login-input"
                // placeholder={"Phone..."}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </CustomLabel>
          </Form.Group>
          <Row>
            <Col>
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
            </Col>
            <Col>
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
            </Col>
          </Row>
          <Row>
            <Form.Check
              type={"checkbox"}
              id={`default-checkbox}`}
              label={`I agree to the User Agreement and Conditions `}
            />
          </Row>
          <Row>
            <Button
              variant="danger"
              text={"Create Account"}
              onClick={handleSignUp}
              className="login-button"
            ></Button>
          </Row>
        </Container>
      </Form>
      {showAlert && (
        <MyToast
          bg={alertClass}
          show={showAlert}
          onClose={() => setShowAlert(false)}
          message={error}
        />
      )}
    </div>
  );
}
