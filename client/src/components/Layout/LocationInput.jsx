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
        console.log(place.geometry.location);
        const { lat, lng } = place.geometry.location;
        const newLocation = `${lat()},${lng()}`;
        setLocation(place.formatted_address || place.name); // Update the location state with the address or name of the selected place
        setTimeout(() => {
          onLocationChange(newLocation);
        }, 0);
      }
    });
  }, [onLocationChange]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setTimeout(() => {
      onLocationChange(event.target.value);
    }, 0); // set a delay of 1 second
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
