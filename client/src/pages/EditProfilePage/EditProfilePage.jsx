import React from "react";
// import ImageComponent from "../../components/ui/ImageComponent";
import Button from "../../components/ui/Button";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import Form from "react-bootstrap/Form";
import { Container, Alert } from "react-bootstrap";
import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MyToast from "../../components/ui/Toast";
import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/ui/Card";
import Joi from "joi";
import { signUp } from "../../apiClient";

export default function EditProfilePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Handler function for submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== confirmPassword) {
      setShowErrorMessage(true);
      return;
    }

    // Send a request to update the user's information
    fetch("/api/update-user", {
      method: "PUT",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShowSuccessMessage(true);
        } else {
          setShowErrorMessage(true);
        }
      })
      .catch((error) => {
        setShowErrorMessage(true);
      });
  };

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
      // console.log(` *** Response from SignUp End Point : ${response.data}`);
      if (response.data.success) {
        setShowSuccessMessage(true);
        setAlertClass("success");
        setError("Account Created Successfully!!!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setAlertClass("Danger");
        setError("Invalid Data In Form");
        setShowErrorMessage(true);
      }
    } catch (error) {
      setAlertClass("Danger");
      setError("Invalid Data In Form");
      setShowErrorMessage(true);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="AccountSettings-container">
        <h1>Account Settings</h1>
        <Form className="AccountSettings-form" onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="AccountSettings-input">
            <Form.Label>Update First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="in"
            />
          </Form.Group>
          <Button
            variant="primary"
            text="Update First Name"
            className="save-button"></Button>
          <Form.Group controlId="name" className="AccountSettings-input">
            <Form.Label>Update Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="in"
            />
          </Form.Group>
          <Button
            variant="primary"
            text="Update Last Name"
            className="save-button"></Button>
          <Form.Group controlId="phone" className="AccountSettings-input">
            <Form.Label>Update Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Number"
              value={phone}
              onChange={(e) => setName(e.target.value)}
              className="in"
            />
          </Form.Group>
          <Button
            variant="primary"
            text="Update Phone No"
            className="save-button"></Button>
          <Form.Group controlId="email" className="AccountSettings-input">
            <Form.Label>Update Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="in"
            />
          </Form.Group>
          <Button
            variant="primary"
            text="Update Email"
            className="save-button"></Button>
          <Form.Group controlId="password" className="AccountSettings-input">
            <Form.Label>Update Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="in"
            />
          </Form.Group>
          <Form.Group
            controlId="confirmPassword"
            className="AccountSettings-input">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="in"
            />
          </Form.Group>
          <Button
            variant="primary"
            text="Update Password"
            className="save-button"></Button>
        </Form>
        {showSuccessMessage && (
          <Alert variant="success">Your information has been updated.</Alert>
        )}
        {showErrorMessage && (
          <Alert variant="danger">
            There was an error updating your information. Please try again.
          </Alert>
        )}
      </Container>
    </>
  );
}
