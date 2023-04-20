import React from "react";

const EventDetails = ({ eventInfo }) => {
  return (
    <div>
      <h2>{eventInfo.title}</h2>
      <p>{eventInfo.description}</p>
      <p>Date: {eventInfo.date}</p>
      <p>Event ID: {eventInfo.event_id}</p>
    </div>
  );
};

export default EventDetails;
