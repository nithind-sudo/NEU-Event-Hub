import React from 'react';
import { Form } from 'react-bootstrap';

const CustomLabel = ({ htmlFor, className, children }) => {
  return <Form.Label htmlFor={htmlFor}
  className = {className}
  >{children}
  
  </Form.Label>;
};

export default CustomLabel;
