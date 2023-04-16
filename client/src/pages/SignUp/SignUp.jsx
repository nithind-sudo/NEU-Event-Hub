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
import Joi from "joi";
import ImageComponent from "../../components/ui/ImageComponent";
import SignUpImage from "../../assets/signup-image.svg";
import loginLogo from "../../assets/login-logo.svg";
import { Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.ref("password"),
    phoneNumber: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
  });

  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertClass, setAlertClass] = useState("danger");
  const [errorValidation, setErrorValidation] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleFieldChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFieldBlur = (name) => {
    const validationResult = schema.validate(formData, { abortEarly: false });
    if (validationResult.error) {
      const newErrors = validationResult.error.details.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrorValidation(newErrors);
    } else {
      setErrorValidation({});
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.email,
      phone_number: formData.phoneNumber,
      password: formData.password,
    };
    try {
      const response = await signUp(payload);
      console.log(` *** Response from SignUp End Point : ${response.data}`);
      if (response.data.success) {
        setShowAlert(true);
        setAlertClass("success");
        setError("Account Created Successfully!!!");
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
    <div className="signup-page">
      <Form className="signup-content">
        <Container>
          <div className="signup-container">
            <img
              src={loginLogo}
              style={{ width: "290px", height: "100px" }}
              alt="Northeastern-Events"
            />
            <Row className="justify-content-center">
              <Col>
                <Form.Group controlId="userFirstName">
                  <CustomLabel>
                    First Name
                    <TextInput
                      type="text"
                      value={formData.firstName}
                      className="signup-input"
                      onChange={(e) =>
                        handleFieldChange("firstName", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("firstName")}
                      isInvalid={!!errorValidation.firstName}
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
                      value={formData.lastName}
                      className="signup-input"
                      onChange={(e) =>
                        handleFieldChange("lastName", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("lastName")}
                      isInvalid={!!errorValidation.lastName}
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
                    value={formData.email}
                    className="signup-input-personal"
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    onBlur={() => handleFieldBlur("email")}
                    isInvalid={!!errorValidation.email}
                  />
                </CustomLabel>
              </Form.Group>
            </Row>
            <Form.Group controlId="userPhone">
              <CustomLabel>
                Phone
                <TextInput
                  type="text"
                  value={formData.phoneNumber}
                  className="signup-input-personal"
                  onChange={(e) =>
                    handleFieldChange("phoneNumber", e.target.value)
                  }
                  onBlur={() => handleFieldBlur("phoneNumber")}
                  isInvalid={!!errorValidation.phoneNumber}
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
                      value={formData.password}
                      className="signup-input"
                      onChange={(e) =>
                        handleFieldChange("password", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("password")}
                      isInvalid={!!errorValidation.password}
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
                      value={formData.confirmPassword}
                      className="signup-input"
                      onChange={(e) =>
                        handleFieldChange("confirmPassword", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("confirmPassword")}
                      isInvalid={!!errorValidation.confirmPassword}
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

            <Button
              variant="danger"
              text={"Create Account"}
              onClick={handleSignUp}
              className="signup-button"
            ></Button>
            <CustomLabel>
              Have an account? <Link to="/login">Login here</Link>
            </CustomLabel>
          </div>
        </Container>
      </Form>
      <div className="flex-col">
        <ImageComponent src={SignUpImage} className="image-fit" />
      </div>
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
