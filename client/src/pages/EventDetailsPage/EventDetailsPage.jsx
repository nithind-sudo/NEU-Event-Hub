import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import EventDetails from "../EventDetails/EventDetails";
import { getEventDetails } from "../../apiClient";
import { EventManagementState } from "../../contexts/context";
import { ACTIONS } from "../../contexts/constants";

const EventDetailsPage = () => {
  const location = useLocation();
  const { eventID } = useParams();
  const [eventInfo, setEventInfo] = useState(null);
  const { state, dispatch } = EventManagementState();

  // console.log("selected event Id : ", eventID);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventDetails(eventID);
        console.log("Response for GET Event for Specific event : ", response);
        if (response.data) {
          setEventInfo(response.data[0]);
          const selectedEvent = response.data[0];
          dispatch({
            type: ACTIONS.SET_VIEW_EVENT,
            event : selectedEvent,
            eventName: selectedEvent.title,
            eventDescription: selectedEvent.description,
            eventID: selectedEvent.event_id,
            eventDate: selectedEvent.date,
            eventImage: selectedEvent.imageUrl,
            ticketPrice: selectedEvent.price || 20,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvent();
  }, [eventID]);

  return (
    <div>
      {eventInfo && (
        <EventDetails eventInfo={eventInfo} event={location.state.event} />
      )}
    </div>
  );
};

export default EventDetailsPage;
