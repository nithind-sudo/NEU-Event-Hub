import React, { useEffect, useState } from "react";
import AllEvents from "../AllEvents/AllEvents";
import { getAllEvents } from "../../apiClient";
import "./styles/ShowAllEvents.css";

const ShowAllEvents = (props) => {
  const [eventArray, setEventArray] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        console.log("Response for GET Event Array: ", response);
        if (response.data) {
          setEventArray(response.data.reverse());
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="allEventsCheck">
      <AllEvents
        eventArray={eventArray}
        getList={""}
        handlelogout={props.onLogout}
      />
    </div>
  );
};

export default ShowAllEvents;
