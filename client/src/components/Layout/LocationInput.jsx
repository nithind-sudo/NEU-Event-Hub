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
        onLocationChange(`${lat},${lng}`);
      }
    });
  }, [onLocationChange]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    onLocationChange(event.target.value);
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
