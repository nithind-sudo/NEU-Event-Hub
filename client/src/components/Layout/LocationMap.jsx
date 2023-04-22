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
      <Map
        google={google}
        zoom={12}
        initialCenter={{
          lat: location.lat,
          lng: location.lng,
        }}
        style={{ width: "100%", height: "200px" }}>
        <Marker position={{ lat: location.lat, lng: location.lng }} />
      </Map>
    </Card>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCp5wKCi6eIOoNPxLEIm74_JDa0l4v1mxc",
})(LocationMap);
