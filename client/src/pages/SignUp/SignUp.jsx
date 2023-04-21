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
    role: Joi.string().valid("User", "Admin").required(),
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
    const formData = { ...this.state.formData, role: e };
    const { error } = schema.validate(formData);
    if (error) {
      setAlertClass("Danger");
      setError("Please select a role");
      setShowAlert(true);
    } else {
      setSelectedRole(e);
    }
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
    if (!Object.keys(errorValidation).length) {
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
    } else {
      console.log("errorValidation", errorValidation);
      let errorString = "";
      for (let field in errorValidation) {
        errorString += `\n${errorValidation[field].replace(
          /['"]+/g,
          ""
        )},`;
      }
      errorString = errorString.slice(0, -1);

      console.log("Error string : ", errorString);
      setError(`Please correct the following fields : ${errorString}`);
      setShowAlert(true);
    }
  };

  return (
    <React.Fragment>
      <div className="setBackGroundSignUp">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="justify-content-center align-items-center my-4">
                <div className="card makeLoginCardBackground">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="text-center">
                        <h5 className="display-6">Sign Up</h5>
                      </div>
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="row">
                          <div className="text-center">
                            <img
                              src={loginLogo}
                              className="loginLogo"
                              alt="Northeastern-Events"
                            />
                          </div>
                        </div>
                        <div className="row my-3">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className="lead mt-3 mb-1">First Name</label>
                            <div className="">
                              <TextInput
                                type="text"
                                value={formData.firstName}
                                className=""
                                onChange={(e) =>
                                  handleFieldChange("firstName", e.target.value)
                                }
                                onBlur={() => handleFieldBlur("firstName")}
                                isInvalid={!!errorValidation.firstName}
                                placeholder={"Enter your First Name"}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className="lead mt-3 mb-1">Last Name</label>
                            <div className="">
                              <TextInput
                                type="text"
                                value={formData.lastName}
                                className=""
                                onChange={(e) =>
                                  handleFieldChange("lastName", e.target.value)
                                }
                                onBlur={() => handleFieldBlur("lastName")}
                                isInvalid={!!errorValidation.lastName}
                                placeholder={"Enter your Last Name"}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row my-3">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className="lead mt-3 mb-1">Email</label>
                            <div className="">
                              <TextInput
                                type="text"
                                value={formData.email}
                                className=""
                                onChange={(e) =>
                                  handleFieldChange("email", e.target.value)
                                }
                                onBlur={() => handleFieldBlur("email")}
                                isInvalid={!!errorValidation.email}
                                placeholder={"Enter your Email ID"}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className="lead mt-3 mb-1">
                              Phone Number
                            </label>
                            <div className="">
                              <TextInput
                                type="text"
                                value={formData.phoneNumber}
                                className=""
                                placeholder={"Enter your Mobile Number"}
                                onChange={(e) =>
                                  handleFieldChange(
                                    "phoneNumber",
                                    e.target.value
                                  )
                                }
                                onBlur={() => handleFieldBlur("phoneNumber")}
                                isInvalid={!!errorValidation.phoneNumber}
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                        <br />
                        <div className="row my-3">
                          <label className="lead mt-3 mb-1">Role</label>
                          <div className="container">
                            <Dropdown className="" onSelect={handleSelect}>
                              <Dropdown.Toggle
                                variant="outline-secondary"
                                style={{ width: "100%" }}
                                id="dropdown-basic"
                              >
                                {selectedRole}
                              </Dropdown.Toggle>

                              <Dropdown.Menu style={{ width: "100%" }}>
                                <Dropdown.Item eventKey="User">
                                  User
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Admin">
                                  Admin
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <br />
                        <br />
                        <div className="row my-3">
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className="lead mt-3 mb-1">Password</label>
                            <div className="">
                              <TextInput
                                type="password"
                                value={formData.password}
                                className=""
                                onChange={(e) =>
                                  handleFieldChange("password", e.target.value)
                                }
                                onBlur={() => handleFieldBlur("password")}
                                isInvalid={!!errorValidation.password}
                                placeholder={"Enter Password"}
                              />
                            </div>
                          </div>
                          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <label className="lead mt-3 mb-1">
                              Confirm Password
                            </label>
                            <div className="">
                              <TextInput
                                type="password"
                                value={formData.confirmPassword}
                                className=""
                                onChange={(e) =>
                                  handleFieldChange(
                                    "confirmPassword",
                                    e.target.value
                                  )
                                }
                                onBlur={() =>
                                  handleFieldBlur("confirmPassword")
                                }
                                isInvalid={!!errorValidation.confirmPassword}
                                placeholder={"Re-Enter your Password"}
                              />
                            </div>
                          </div>
                        </div>
                        <br />
                        <br />
                        <div className="row my-3">
                          <div className="container">
                            <div className="text-center justify-content-center align-items-center">
                              <Button
                                variant="success"
                                text={"Create Account"}
                                onClick={handleSignUp}
                                className="mt-3 mb-1"
                              ></Button>
                              <br />
                              <label className=" mt-3 mb-1">
                                Have an Account?
                              </label>
                              <Link to="/login">
                                <label className="ms-2 cursorPointer">
                                  Login here
                                </label>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {showAlert && (
                      <MyToast
                        bg={alertClass}
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
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
