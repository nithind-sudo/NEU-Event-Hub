import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import "./AllEvents.css";
import { getAllEvents } from "../../apiClient";
import { Link, useNavigate } from "react-router-dom";
import EventDetails from "../EventDetails/EventDetails";

const AllEvents = (props) => {
  let eventArray = props.eventArray;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  const handleViewEvent = (eventInfo) => {
    setSelectedEvent(eventInfo);
    navigate(`/event/${eventInfo.event_id}`);
  };
  return (
    <div className="my-3">
      <Navbar handlelogout={props.handlelogout} />
      <div className="container events-container">
        <b>
          <div className="display-6 colorCodeNortheastern">EVENTS</div>
          <blockquote className="blockquote">
            by Trending List{" "}
            {props.getList != "" ? `(` + `${props.getList}` + `)` : ""}
          </blockquote>
        </b>
        <div className="row">
          {eventArray.map((eventInfo) => (
            <div
              className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
              key={eventInfo.event_id}>
              <div className="m-2">
                <Card
                  eventName={eventInfo.title}
                  eventID={eventInfo.event_id}
                  eventDescription={eventInfo.description}
                  eventDate={eventInfo.date}
                  handleViewEvent={() => handleViewEvent(eventInfo)}
                  eventImage={eventInfo.imageUrl}
                />
              </div>
            </div>
          ))}
        </div>
        {/* {selectedEvent && <EventDetails eventInfo={selectedEvent} />} */}
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default AllEvents;
