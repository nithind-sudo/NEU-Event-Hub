import React from "react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({ variant, onClick, text, ...props }) => {
    return (
      <Button variant={variant} onClick={onClick} {...props}>
        {text}
      </Button>
    );
};
  
export default ButtonComponent;