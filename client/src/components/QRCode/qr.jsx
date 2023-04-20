import React from 'react';
import QRCode from 'qrcode.react';
import { BiCalendar } from 'react-icons/bi';
import moment from 'moment';
import { Button, Col, Row } from 'react-bootstrap';

function QRCodeEvent(props) {
  const { event } = props;
  const eventDate = moment(event.date).format('MMMM D, YYYY');

  return (
    <Row>
      <Col sm={12} md={4} className="text-center">
        <QRCode value={event.link} />
      </Col>
      <Col sm={12} md={8}>
        <h3>{event.title}</h3>
        <p>
          <BiCalendar /> {eventDate}
        </p>
        <p>{event.time}</p>
        <p>{event.description}</p>
      </Col>
    </Row>
  );
}

export default QRCodeEvent;
