import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const EventDetails = ({ eventInfo }) => {
  console.log("Event Info : ", eventInfo);
  const navigate = useNavigate();

  const durationInMillis =
    new Date(eventInfo.endTime).getTime() -
    new Date(eventInfo.startTime).getTime();
  const durationInHours = Math.round(durationInMillis / (1000 * 60 * 60));

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

  const imageAddress =
    "https://images.unsplash.com/photo-1498940757830-82f7813bf178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80";
  const eventPrice = 20;
  const [ticketCount, setTicketCount] = useState(1);

  const handleIncrement = () => {
    setTicketCount(ticketCount < 3 ? ticketCount + 1 : 3); // Limit the ticket count to a maximum of 3
  };

  const handleDecrement = () => {
    setTicketCount(ticketCount > 1 ? ticketCount - 1 : 1); // Limit the ticket count to a minimum of 1
  };

  const handleBookEvent = () => {
    navigate("/payment");
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div className="event-details-container">
          <Row>
            <img
              src={imageAddress}
              alt="event"
              style={{ marginBottom: "25px" }}
            />
          </Row>
          <Row>
            <Col md={8}>
              <Card>
                <Card.Body style={{ color: "black" }}>
                  <Row>
                    <p className="event-date">
                      {new Date(eventInfo.date)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                        .replace(/\b\w/g, (c) => c.toUpperCase())}

                      <h1 className="event-title">{eventInfo.title}</h1>
                    </p>
                  </Row>
                  <Row>
                    <p className="summary">{eventInfo.description}</p>
                  </Row>
                  <Row>{/* Display Organizer Details */}</Row>

                  <Row>
                    {/* Display Location */}
                    <h5>When and Where</h5>
                    <Col>
                      {/* Date and Time  */}
                      <FontAwesomeIcon icon={faCalendarAlt} /> {formattedTime}
                    </Col>
                    <Col>
                      {/* Location  */}
                      <LocationMap location={eventInfo.location} /> Location
                    </Col>
                  </Row>

                  <Row>
                    {/* TotalDuration and Mention Mobile Ticket */}
                    <h5>About the Event</h5>
                    <Col>
                      {" "}
                      <FontAwesomeIcon icon={faClock} /> {durationInHours} hrs
                    </Col>
                    <Col>
                      {" "}
                      <FontAwesomeIcon icon={faMobileAlt} /> Mobile Ticket
                    </Col>
                  </Row>

                  <Row>
                    <h5>Tags : </h5>
                    <Col md={1}>
                      <Badge pill bg="dark" className="mr-2">
                        {eventInfo.category}
                      </Badge>
                    </Col>
                    {/* Show Tags */}
                  </Row>

                  {/* <p>Date: {eventInfo.date.substring(0, 10)}</p>
                  <p>Event ID: {eventInfo.event_id}</p>
                  <p>
                    Star Time of Event : {eventInfo.startTime.substring(11, 19)}
                  </p>
                  <p>
                    End Time of Event : {eventInfo.endTime.substring(11, 19)}
                  </p> */}
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
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
            </Col>
          </Row>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default EventDetails;
