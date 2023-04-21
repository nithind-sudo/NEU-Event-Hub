import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./EventDetails.css";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileAlt,
  faClock,
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import LocationMap from "../../components/Layout/LocationMap";
import { deleteEventByEventID } from "../../apiClient";
import { useNavigate } from "react-router-dom";
import { EventManagementState } from "../../contexts/context";
import { ACTIONS } from "../../contexts/constants";

const EventDetails = ({ eventInfo, event }) => {
  // console.log("Event Info : ", eventInfo);
  const durationInMillis =
    new Date(eventInfo.endTime).getTime() -
    new Date(eventInfo.startTime).getTime();
  const durationInHours = Math.round(durationInMillis / (1000 * 60 * 60));
  const { state, dispatch } = EventManagementState();

  const formattedTime = `${new Date(eventInfo.startTime).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
  )} · ${new Date(eventInfo.startTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  })} - ${new Date(eventInfo.endTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  })}`;

  const imageAddress = eventInfo.imageUrl;
  const eventPrice = eventInfo.price;
  const [ticketCount, setTicketCount] = useState(1);

  const handleIncrement = () => {
    setTicketCount(ticketCount < 3 ? ticketCount + 1 : 3); // Limit the ticket count to a maximum of 3
    
    
  };

  const handleDecrement = () => {
    setTicketCount(ticketCount > 1 ? ticketCount - 1 : 1); // Limit the ticket count to a minimum of 1
    console.log("After ticket Decrement : ", ticketCount);
  };

  const handleBookEvent = () => {
    // Handle the book event action here
    // console.log("Clicked the book event handle with number of seats : ", ticketCount);
    dispatch({ type: ACTIONS.CHECKOUT, numberOfSeats: ticketCount });
    console.log("Current state after checkout : ", state);
    navigate("/checkout");
  };

  const navigate = useNavigate();

  const deleteEvent = () => {
    deleteEventByEventID(eventInfo.event_id)
      .then((response) => response.data)
      .then((data) => {
        navigate("/allEvents");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        <div className="container">
          <div className="row my-1">
            <img
              src={imageAddress}
              alt="event"
              style={{ marginBottom: "25px" }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <div className="container">
              <div class="card text-dark my-2 py-3">
                <div class="card-body">
                  <div class="card-title display-6">
                    {eventInfo.title}
                    <div class="lead">
                      <span>Registered Date: </span>
                      {new Date(eventInfo.date)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </div>
                  </div>
                  <br />

                  <div class="card-subtitle mb-1 text-body-secondary">
                    <b>Event Description</b>
                  </div>
                  <p class="card-text">{eventInfo.description}</p>
                  <br />

                  <div class="card-subtitle mb-1 text-body-secondary">
                    <b>Event Date and Time</b>
                  </div>
                  <p class="card-text">
                    <FontAwesomeIcon icon={faCalendarAlt} /> {formattedTime}
                  </p>
                  <br />

                  <div class="card-subtitle mb-2 text-body-secondary">
                    <b>Duration</b>
                  </div>
                  <p class="card-text">
                    <FontAwesomeIcon icon={faClock} /> {durationInHours} hrs
                  </p>
                  <br />

                  <div class="card-subtitle mb-1 text-body-secondary">
                    <b>Requirements</b>
                  </div>
                  <p class="card-text">
                    <FontAwesomeIcon icon={faMobileAlt} /> Mobile Ticket
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <div className="container my-2 py-3">
              <Card>
                <Card.Body>
                  <Card.Title style={{ color: "black" }}>
                    Price : {eventPrice}$
                  </Card.Title>
                  <div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleDecrement}
                    >
                      -
                    </Button>{" "}
                    <span style={{ margin: "0 10px", color: "black" }}>
                      {ticketCount}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleIncrement}
                    >
                      +
                    </Button>
                  </div>
                  <br />
                  <Button variant="primary" onClick={handleBookEvent}>
                    Reserve Spot
                  </Button>
                </Card.Body>
              </Card>
              <br />
              <div class="card text-dark locationCardStyle my-2 py-3">
                <div class="card-body">
                  <div class="card-subtitle mb-1 text-body-secondary">
                    <b>Location and Venue</b>
                  </div>
                  <p class="card-text">
                    <LocationMap location={eventInfo.location} />
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <div className="container">
              <div class="card text-dark my-2 py-3">
                <div class="card-body">
                  <div class="card-subtitle mb-1 text-body-secondary">
                    <b>Tags:</b>
                  </div>
                  <p class="card-text">
                    <Badge pill bg="dark" className="mr-2">
                      {eventInfo.category}
                    </Badge>
                  </p>
                  <br />

                  <div class="card-subtitle mb-1 text-body-secondary">
                    <b>Event ID</b>
                  </div>
                  <p class="card-text">{eventInfo.event_id}</p>
                  <br />

                  <div class="card-subtitle mb-1 text-body-secondary">
                    <b>Tickets Available: </b>
                  </div>
                  <p class="card-text">{eventInfo.numberOfTickets}</p>
                  <br />

                  <div class="card-subtitle mb-2 text-body-secondary">
                    <b>Start Time - End Time</b>
                  </div>
                  <p class="card-text">
                    {eventInfo.startTime.substring(11, 19)} -{" "}
                    {eventInfo.endTime.substring(11, 19)}
                  </p>
                  <br />

                  {state.role === "admin" && (
                    <>
                      <div class="card-subtitle mb-1 text-body-secondary">
                        <b>Caution</b>
                      </div>
                      <p class="card-text">
                        <button
                          className="btn btn-danger"
                          onClick={deleteEvent}
                        >
                          Delete Event
                        </button>
                      </p>
                    </>
                  )}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
