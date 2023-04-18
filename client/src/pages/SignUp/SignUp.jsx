import React from "react";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import MyToast from "../../components/ui/Toast";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import Button from "../../components/ui/Button";
import { useState } from "react";
import "./SignUp.css";
import { fetchSignUp } from "../../apiClient";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import ImageComponent from "../../components/ui/ImageComponent";
import SignUpImage from "../../assets/signup-image.jpg";
import SignUpImageNew from "../../assets/images/singup.jpeg";
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
      const response = await fetchSignUp(payload);
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
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div>
              <div className="row">
                <div className="text-center">
                  <img
                    src={loginLogo}
                    style={{ width: "290px", height: "100px" }}
                    alt="Northeastern-Events"
                  />
                </div>
              </div>
              <Form>
                <Container>
                  <div className="signup-container">
                    <Row className="justify-content-center">
                      <Col>
                        <Form.Group controlId="userFirstName">
                          <CustomLabel>
                            <label className="lead mt-3 mb-1">First Name</label>
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
                            <label className="lead mt-3 mb-1">Last Name</label>
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
                          <label className="lead mt-3 mb-1">Email</label>
                          <TextInput
                            type="text"
                            value={formData.email}
                            className="signup-input-personal"
                            onChange={(e) =>
                              handleFieldChange("email", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("email")}
                            isInvalid={!!errorValidation.email}
                          />
                        </CustomLabel>
                      </Form.Group>
                    </Row>
                    <Form.Group controlId="userPhone">
                      <CustomLabel>
                        <label className="lead mt-3 mb-1">Mobile Number</label>
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
                            <label className="lead mt-3 mb-1">Password</label>
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
                            <label className="lead mt-3 mb-1">
                              Confirm Password
                            </label>
                            <TextInput
                              type="password"
                              value={formData.confirmPassword}
                              className="signup-input"
                              onChange={(e) =>
                                handleFieldChange(
                                  "confirmPassword",
                                  e.target.value
                                )
                              }
                              onBlur={() => handleFieldBlur("confirmPassword")}
                              isInvalid={!!errorValidation.confirmPassword}
                            />
                          </CustomLabel>
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* <Row>
              <Form.Check
                type={"checkbox"}
                id={`default-checkbox}`}
                label={`I agree to the User Agreement and Conditions `}
              />
            </Row> */}

                    <Button
                      variant="danger"
                      text={"Create Account"}
                      onClick={handleSignUp}
                      className="signup-button mt-3 mb-1"></Button>
                    <CustomLabel>
                      <label className="lead mt-3 mb-1">Have an Account?</label>
                      <Link to="/login">
                        <label className="lead ms-2 cursorPointer">
                          Login here
                        </label>
                      </Link>
                    </CustomLabel>
                  </div>
                </Container>
              </Form>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div>
              <ImageComponent
                src={SignUpImageNew}
                className="image-fit image-container"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <Footer fixed={"fixed-bottom"} /> */}
      <div className="flex-col"></div>

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
