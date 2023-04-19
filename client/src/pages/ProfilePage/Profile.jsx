import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "./Profile.css";
import { EventManagementState } from "../../contexts/context";
import { fetchSession, fetchUserInfo, updateUserInfo } from "../../apiClient";
import { ACTIONS } from "../../contexts/constants";
import { useNavigate } from "react-router-dom";

export default function Profile({ user }) {
  const { state, dispatch } = EventManagementState();

  const [firstName, setFirstName] = useState(state.first_name);
  const [lastName, setLastName] = useState(state.last_name);
  const [phoneNumber, setPhoneNumber] = useState(state.phone_number);
  const [username, setUsername] = useState(state.username);
  const [role, setRole] = useState(state.role);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Hitting userInfo for user_id : ", state.user_id);
    fetchSession().then((sessionResponse) => {
      if (sessionResponse.data.success) {
        fetchUserInfo(sessionResponse.data.user_id)
          .then((response) => {
            console.log("*** Response from GET User API : ", response);
            const userProfile = response.data[0];
            dispatch({
              type: ACTIONS.GET_USER,
              first_name: userProfile.first_name,
              last_name: userProfile.last_name,
              phone_number: userProfile.phone_number,
              role: userProfile.role,
              created_on: userProfile.created_time,
              events_booked: userProfile.events_booked,
              favorites: userProfile.favorites,
            });

            setFirstName(userProfile.first_name);
            setLastName(userProfile.last_name);
            setPhoneNumber(userProfile.phone_number);
            setRole(userProfile.role);
            setUsername(userProfile.username);
          })
          .catch((error) => {
            console.log(
              "Error while fetching UserInfo inside useEffect ",
              error
            );
          });
      } else {
        dispatch({ type: ACTIONS.LOG_OUT });
        navigate("/login");
      }
    });
  }, []);

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
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };

    updateUserInfo(state.user_id, payload)
      .then((response) => {
        console.log("Response after updating User profile : ", response);
      })
      .catch((error) => {
        console.log("Error while updating user info : ", error.message);
      });
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <div className="profile-image-container">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              className="profile-image"
            />
          </div>
          <div className="profile-details">
            <h5>{username}</h5>
            <p>{role}</p>
          </div>
        </Col>
        <Col md={8}>
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
        </Col>
      </Row>
    </Container>
  );
}
