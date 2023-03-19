// CustomButton.js
import React from "react";
import { Button } from "react-bootstrap";

const PrimaryButton = ({ variant, onClick, children, ...props }) => {
  return (
    <Button variant={variant} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
