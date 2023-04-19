import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "./Profile.css";
import { EventManagementState } from "../../contexts/context";

export default function Profile({ user }) {
  const { state, dispatch } = EventManagementState();

  const [firstName, setFirstName] = useState("Nithin");
  const [lastName, setLastName] = useState("Bharadwaj");
  const [phoneNumber, setPhoneNumber] = useState("8888888888");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSaveChanges = () => {
    // Code to save changes to the user's profile
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card className="profile-card">
            <Card.Body>
              <div className="profile-image-container">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile Picture"
                  className="profile-image"
                />
              </div>
              <div className="profile-details">
                <h5>{"nithin@gmail.com"}</h5>
                <p>{"admin"}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card className="profile-card">
            <Card.Body>
              <div className="profile-form">
                <h5>Edit Profile</h5>
                <Form>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  </Form.Group>

                  <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
