import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventDetails from "../EventDetails/EventDetails";
import { getEventDetails } from "../../apiClient";

const EventDetailsPage = () => {
  const { eventID } = useParams();
  const [eventInfo, setEventInfo] = useState(null);

  // console.log("selected event Id : ", eventID);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventDetails(eventID);
        // console.log("Response for GET Event for Specific event : ", response);
        if (response.data) {
          setEventInfo(response.data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvent();
  }, [eventID]);

  return <div>{eventInfo && <EventDetails eventInfo={eventInfo} />}</div>;
};

export default EventDetailsPage;
