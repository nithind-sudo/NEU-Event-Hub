import React from "react";
import Card from "../../components/Card/Card";

const AllEvents = () => {
  return (
    <div className="my-3">
      <div className="container">
        <b>
          <div className="display-6 colorCodeNortheastern">EVENTS</div>
          <blockquote className="blockquote">by Trending List</blockquote>
        </b>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="m-2">
              <Card
                eventName="Japanese Noodles Day"
                eventID="1022"
                eventDescription="It's a Noodle's party organized by Northeastern's Japanese Organization"
                eventDate={Date().toLocaleString()}
              />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <div className="m-2">
              <Card
                eventName="Japanese Noodles Day"
                eventID="1023"
                eventDescription="It's a Noodle's party organized by Northeastern's Japanese Organization"
                eventDate={Date().toLocaleString()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
