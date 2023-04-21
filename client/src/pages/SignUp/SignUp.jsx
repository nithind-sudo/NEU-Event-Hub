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
import Dropdown from "react-bootstrap/Dropdown";

export default function SignUp({ ...props }) {
  const navigate = useNavigate();
  const { error, setError, showAlert, setShowAlert } = props;

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

  const [selectedRole, setSelectedRole] = useState("Select a Role");
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

  const handleSelect = (e) => {
    setSelectedRole(e);
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
      role: selectedRole,
    };
    try {
      const response = await fetchSignUp(payload);
      // console.log(` *** Response from SignUp End Point : ${response.data}`);
      if (response.data.success) {
        setShowAlert(true);
        setAlertClass("success");
        setError("Account Created Successfully!!!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
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
    <React.Fragment>
      <div className="setBackGroundSignUp">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="justify-content-center align-items-center my-4">
                <div className="card makeLoginCardBackground">
                  <div className="card-body">
                    <div className="row">
                      <div className="text-center">
                        <h5 className="display-6">Sign Up</h5>
                      </div>
                    </div>
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
                                  <label className="lead mt-3 mb-1">
                                    First Name
                                  </label>
                                  <TextInput
                                    type="text"
                                    value={formData.firstName}
                                    className="signup-input"
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => handleFieldBlur("firstName")}
                                    isInvalid={!!errorValidation.firstName}
                                    placeholder={"Enter your First Name"}
                                  />
                                </CustomLabel>
                              </Form.Group>
                            </Col>

                            <Col>
                              <Form.Group controlId="userLastName">
                                <CustomLabel>
                                  <label className="lead mt-3 mb-1">
                                    Last Name
                                  </label>
                                  <TextInput
                                    type="text"
                                    value={formData.lastName}
                                    className="signup-input"
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => handleFieldBlur("lastName")}
                                    isInvalid={!!errorValidation.lastName}
                                    placeholder={"Enter your Last Name"}
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
                                  className="signup-input-email"
                                  onChange={(e) =>
                                    handleFieldChange("email", e.target.value)
                                  }
                                  onBlur={() => handleFieldBlur("email")}
                                  isInvalid={!!errorValidation.email}
                                  placeholder={"Enter your Email ID"}
                                />
                              </CustomLabel>
                            </Form.Group>
                          </Row>

                          <Row className="justify-content-center">
                            <Col>
                              <Form.Group controlId="userPhone">
                                <CustomLabel>
                                  <label className="lead mt-3 mb-1">
                                    Mobile Number
                                  </label>
                                  <TextInput
                                    type="text"
                                    value={formData.phoneNumber}
                                    className="signup-input-personal"
                                    placeholder={"Enter your Mobile Number"}
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "phoneNumber",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() =>
                                      handleFieldBlur("phoneNumber")
                                    }
                                    isInvalid={!!errorValidation.phoneNumber}
                                  />
                                </CustomLabel>
                              </Form.Group>
                            </Col>

                            <Col>
                              <Form.Group controlId="role">
                                <CustomLabel>
                                  <label className="lead mt-3 mb-1">Role</label>
                                  <Dropdown
                                    className="custom-dropdown-width"
                                    onSelect={handleSelect}>
                                    <Dropdown.Toggle
                                      variant="outline-secondary"
                                      id="dropdown-basic">
                                      {selectedRole}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <Dropdown.Item eventKey="User">
                                        User
                                      </Dropdown.Item>
                                      <Dropdown.Item eventKey="Admin">
                                        Admin
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </CustomLabel>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <Form.Group controlId="userPassword">
                                <CustomLabel>
                                  <label className="lead mt-3 mb-1">
                                    Password
                                  </label>
                                  <TextInput
                                    type="password"
                                    value={formData.password}
                                    className="signup-input"
                                    onChange={(e) =>
                                      handleFieldChange(
                                        "password",
                                        e.target.value
                                      )
                                    }
                                    onBlur={() => handleFieldBlur("password")}
                                    isInvalid={!!errorValidation.password}
                                    placeholder={"Enter Password"}
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
                                    onBlur={() =>
                                      handleFieldBlur("confirmPassword")
                                    }
                                    isInvalid={
                                      !!errorValidation.confirmPassword
                                    }
                                    placeholder={"Re-Enter your Password"}
                                  />
                                </CustomLabel>
                              </Form.Group>
                            </Col>
                          </Row>

                          <Button
                            variant="danger"
                            text={"Create Account"}
                            onClick={handleSignUp}
                            className="signup-button mt-3 mb-1"></Button>
                          <CustomLabel>
                            <label className=" mt-3 mb-1">
                              Have an Account?
                            </label>
                            <Link to="/login">
                              <label className="ms-2 cursorPointer">
                                Login here
                              </label>
                            </Link>
                          </CustomLabel>
                        </div>
                      </Container>
                    </Form>
                    {showAlert && (
                      <MyToast
                        bg={"danger"}
                        show={showAlert}
                        onClose={() => {
                          setShowAlert(false);
                          setError("");
                        }}
                        message={error}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4"></div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
