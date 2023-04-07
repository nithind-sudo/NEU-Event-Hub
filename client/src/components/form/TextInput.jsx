import React from "react";
import { FormControl } from "react-bootstrap";

const TextInput = ({ text, value, onChange, className, placeholder, ...props }) => {
  return (
    <FormControl
      type={text}
      value={value}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default TextInput;
