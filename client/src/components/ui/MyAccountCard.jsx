import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const LeftNavAndContent = ({ navContent, pageContent }) => {
  return (
    <div className="my-5">
    <div className="row">
    <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">{navContent}</div>
    <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">{pageContent}</div>
    </div>
    </div>
    // <Row>
    //   <Col md={2}>
    //     <Card>
    //       <Card.Body>{navContent}</Card.Body>
    //     </Card>
    //   </Col>
    //   <Col md={10}>
    //     <Card>
    //       <Card.Body>{pageContent}</Card.Body>
    //     </Card>
    //   </Col>
    // </Row>
  );
};

export default LeftNavAndContent;
