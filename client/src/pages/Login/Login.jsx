import React from "react";
import ImageComponent from "../../components/ui/ImageComponent";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import "./Login.css";
import loginImage from "../../assets/login_image.jpg";
import loginImageNew from "../../assets/images/holi.jpeg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { login, logout } from "../../apiClient";
import MyToast from "../../components/ui/Toast";
import Joi from "joi";
import { Link } from "react-router-dom";
import loginLogo from "../../assets/login-logo.svg";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
});

export default function Login({ ...props }) {
  const navigate = useNavigate();
  const { error, setError, showAlert, setShowAlert, onLogin } = props;
  // const [error , setError] = props;
  // const [showAlert, setShowAlert] = props;
  const [errorValidation, setErrorValidation] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!Object.keys(errorValidation).length) {
      try {
        // const response = await login(formData.email, formData.password);
        // console.log(` *** Response from Login End Point : ${response.data}`);
        const response = await onLogin(formData.email, formData.password);
        console.log("Response after calling onLogin function : ", response);
        if (response.success) {
          // props.onLogin(response.data.user);
          setShowAlert(false);
          navigate("/main");
        } else {
          setError("Invalid Username/password");
          setShowAlert(true);
        }
      } catch (e) {
        console.log("**** Error while logging in LOGIN COMPONENT:", e);
        setError("Error while hitting backend login API");
        setShowAlert(true);
      }
    } else {
      setError("Invalid Data Entered in Username/Password");
      setShowAlert(true);
    }
  };

  // const handleLogOut = async (e) => {
  //   try {
  //     const response = await logout();
  //     console.log(` *** Response from Login End Point : ${response.data}`);
  //     if (response.data.success) {
  //       props.handleLogin(response.data.user);
  //       navigate("/main");
  //     } else {
  //       setError("Invalid Username/password");
  //       setShowAlert(true);
  //     }
  //   } catch (e) {
  //     console.log("**** Error while logging in:", e);
  //     setError("Error while hitting backend login API");
  //     setShowAlert(true);
  //   }
  // };

  return (
    <div className="login-page">
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="">
              <ImageComponent src={loginImageNew} className="image-fit" />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <Form className="login-content">
              <Container>
                <div className="login-container">
                  <img
                    src={loginLogo}
                    style={{ width: "290px", height: "100px" }}
                    alt="Northeastern-Events"
                  />
                  <Form.Group controlId="userEmail">
                    <CustomLabel>
                      <label className="lead mt-3 mb-1">Username</label>
                      <TextInput
                        type="text"
                        value={formData.username}
                        className="login-input"
                        onChange={(e) =>
                          handleFieldChange("email", e.target.value)
                        }
                        placeholder={"Enter your Email ID"}
                        onBlur={() => handleFieldBlur("email")}
                        isInvalid={!!errorValidation.email}
                      />
                    </CustomLabel>
                    <Form.Control.Feedback type="invalid">
                      {errorValidation.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId="userPassword">
                    <CustomLabel>
                    <label className="lead mt-3 mb-1">Password</label>
                      <TextInput
                        type="password"
                        value={formData.password}
                        className="login-input"
                        placeholder={"Enter your Password"}
                        onChange={(e) =>
                          handleFieldChange("password", e.target.value)
                        }
                        onBlur={() => handleFieldBlur("password")}
                        isInvalid={!!errorValidation.password}
                      />
                    </CustomLabel>
                    <Form.Control.Feedback type="invalid">
                      {errorValidation.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    variant="danger"
                    text={"Sign In"}
                    onClick={handleSignIn}
                    className="login-button mt-3 mb-1"></Button>
                  <CustomLabel className="mt-3 mb-1">
                    <label className="lead">Don't have an account?</label>
                    <Link to="/signup"><label className="lead ms-2 cursorPointer">Sign up here</label></Link>
                  </CustomLabel>
                </div>
              </Container>
            </Form>
          </div>
        </div>
      </div>

      <div className="flex-column"></div>

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
