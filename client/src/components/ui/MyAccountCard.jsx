import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const LeftNavAndContent = ({ navContent, pageContent }) => {
  return (
    <Row>
      <Col md={2}>
        <Card>
          <Card.Body>{navContent}</Card.Body>
        </Card>
      </Col>
      <Col md={10}>
        <Card>
          <Card.Body>{pageContent}</Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LeftNavAndContent;
