import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { Card, Button } from "react-bootstrap";

const LocationMap = ({ location, google }) => {
  const [showMap, setShowMap] = useState(false);

  const toggleShowMap = () => {
    setShowMap(!showMap);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
        <span>{location.address}location </span>
        <Button className="ms-auto" onClick={toggleShowMap}>
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </Card.Header>
      {showMap && (
        <Card.Body>
          <Map
            google={google}
            zoom={14}
            initialCenter={{
              lat: location.lat,
              lng: location.lng,
            }}
            style={{ width: "100%", height: "400px" }}
          >
            <Marker position={{ lat: location.lat, lng: location.lng }} />
          </Map>
        </Card.Body>
      )}
    </Card>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAE1TXk9IfcTk-cM1B1Oo4ykcmh9EhCu6c",
})(LocationMap);
