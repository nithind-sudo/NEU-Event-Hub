// TextInput.js
import React from "react";
import { FormControl } from "react-bootstrap";

const TextInput = ({ value, onChange, placeholder, ...props }) => {
  return (
    <FormControl
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default TextInput;
