import React from 'react';
import { Form } from 'react-bootstrap';

const CustomLabel = ({ htmlFor, children }) => {
  return <Form.Label htmlFor={htmlFor}>{children}</Form.Label>;
};

export default CustomLabel;
