import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const LeftNavAndContent = ({ navContent, pageContent }) => {
  return (
    <Row>
      <Col md={3}>
        <Card>
          <Card.Body>{navContent}</Card.Body>
        </Card>
      </Col>
      <Col md={9}>
        <Card>
          <Card.Body>{pageContent}</Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default LeftNavAndContent;
