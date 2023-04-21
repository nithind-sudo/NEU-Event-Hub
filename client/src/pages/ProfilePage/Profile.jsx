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
    // console.log("Hitting userInfo for user_id : ", state.user_id);
    fetchSession().then((sessionResponse) => {
      if (sessionResponse.data.success) {
        fetchUserInfo(sessionResponse.data.user_id)
          .then((response) => {
            // console.log("*** Response from GET User API : ", response);
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
            // console.log(
            //   "Error while fetching UserInfo inside useEffect ",
            //   error
            // );
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
        // console.log("Response after updating User profile : ", response);
        // navigate("/main");
      })
      .catch((error) => {
        // console.log("Error while updating user info : ", error.message);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center justify-content-center align-items-center">
            <img
              src="https://media.istockphoto.com/id/1206439390/photo/silhouette-of-profile-guy-in-shirt-with-white-button-in-aqua-menthe-circle-on-black.jpg?s=170667a&w=0&k=20&c=xIcUug38E_KlqT3HjxDYSQE7ZlMyV0y0vKmkXmr016U="
              className="img-thumbnail"
              alt="Profile Picture"
              height="250"
              width="250"
            />
          </div>
        </div>
        <br />
        <div className="display-6">Edit Profile</div>
        <br />
        <div className="row">
          <div className="col-12 justify-content-center align-items-center">
            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="shadow-none"
                />
              </Form.Group>
              <br />
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="shadow-none"
                />
              </Form.Group>
              <br />
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  className="shadow-none"
                />
              </Form.Group>
              <br />
              <div className="row">
                <div className="text-center">
                  <Button variant="btn btn-warning" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
