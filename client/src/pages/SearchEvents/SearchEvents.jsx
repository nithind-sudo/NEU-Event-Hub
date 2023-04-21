import React from "react";
import { useLocation } from "react-router-dom";
import AllEvents from "../AllEvents/AllEvents";

const SearchEvents = ({ filteredEventsData }) => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="allEventsCheck">
      <AllEvents
        eventArray={location.state.filters}
        getList={"Filtered Events"}
      />
    </div>
  );
};

export default SearchEvents;
