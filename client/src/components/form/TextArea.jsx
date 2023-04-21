import React from "react";
import { FormControl } from "react-bootstrap";

const TextArea = ({
  text,
  value,
  onChange,
  className,
  placeholder,
  ...props
}) => {
  return (
    <FormControl
      as="textarea"
      rows={15}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
};

export default TextArea;
