import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import "./AllEvents.css";
import { getAllEvents } from "../../apiClient";

const AllEvents = (props) => {
  let eventArray = props.eventArray;
  return (
    <div className="my-3">
      <Navbar handlelogout={props.handlelogout} />
      <div className="container events-container">
        <b>
          <div className="display-6 colorCodeNortheastern">EVENTS</div>
          <blockquote className="blockquote">by Trending List {props.getList!=""?`(`+`${props.getList}`+`)`:""}</blockquote>
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
                  eventDate={eventInfo.date.toLocaleString().substring(0, 10)}
                  eventImage={eventInfo.imageUrl}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*<Footer />*/}
    </div>
  );
};

export default AllEvents;
