import React, { useState, useEffect, useRef } from "react";
import { Form, FormControl } from "react-bootstrap";

function LocationInput({ onLocationChange }) {
  const [location, setLocation] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        const newLocation = `${lat},${lng}`;
        setTimeout(() => {
          onLocationChange(newLocation);
        }, 3000);
      }
    });
  }, [onLocationChange]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setTimeout(() => {
      onLocationChange(event.target.value);
    }, 1000); // set a delay of 1 second
  };

  return (
    <Form>
      <FormControl
        type="text"
        placeholder="Enter a location"
        value={location}
        onChange={handleLocationChange}
        ref={inputRef}
      />
    </Form>
  );
}

export default LocationInput;
