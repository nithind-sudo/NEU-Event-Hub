import React from "react";
import { useParams } from "react-router-dom";
import EventDetails from "../EventDetails/EventDetails";
import { getEventDetails } from "../../apiClient";
import { useEffect, useState } from "react";

const EventDetailsPage = () => {
  const { eventID } = useParams();
  const [ eventInfo, setEventInfo ]= useState({});

  console.log("selected event Id : ", eventID);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getEventDetails(eventID);
        console.log("Response for GET Event for Specific event : ", response);
        if (response.data) {
            setEventInfo(response.data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <EventDetails eventInfo={eventInfo} />
    </div>
  );
};

export default EventDetailsPage;
