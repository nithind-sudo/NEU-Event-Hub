import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./EventDetails.css";

const EventDetails = ({ eventInfo }) => {
  console.log("Event Info : ", eventInfo);
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
    // Handle the book event action here
  };

  return (
    <div>
      <Navbar />
      <Container>
        <div className="event-details-container">
          <Row>
            <img src={imageAddress} alt="event" />
          </Row>
          <Row>
            <Col md={8}>
              <h2>{eventInfo.title}</h2>
              <p>{eventInfo.description}</p>
              <p>Date: {eventInfo.date.substring(0, 10)}</p>
              <p>Event ID: {eventInfo.event_id}</p>
              <p>Star Time of Event : {eventInfo.startTime.substring(11,19)}</p>
              <p>End Time of Event : {eventInfo.endTime.substring(11,19)}</p>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Price : {eventPrice}$</Card.Title>
                  <div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleDecrement}
                    >
                      -
                    </Button>{" "}
                    <span style={{ margin: "0 10px" }}>{ticketCount}</span>
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
