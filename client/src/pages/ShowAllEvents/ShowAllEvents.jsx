import React, { useEffect, useState } from "react";
import AllEvents from "../AllEvents/AllEvents";
import { getAllEvents } from "../../apiClient";
import "./styles/ShowAllEvents.css";
import Footer from "../../components/Footer/footer";

const ShowAllEvents = (props) => {
  const [eventArray, setEventArray] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        // console.log("Response for GET Event Array: ", response);
        if (response.data) {
          setEventArray(response.data.reverse());
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvents();
  }, [eventArray]);
  return (
    <div>
      <div className="allEventsCheck">
        <AllEvents
          eventArray={eventArray}
          getList={""}
          handlelogout={props.onLogout}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ShowAllEvents;
