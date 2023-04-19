import "./CreateEvent.css";
import Footer from "../../components/Layout/Footer";
import { Row, Col, Container, Form, Dropdown } from "react-bootstrap";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { TimeInput, DatePicker } from "react-widgets";
import LocationInput from "../../components/Layout/LocationInput";

const API_KEY = "AIzaSyAE1TXk9IfcTk-cM1B1Oo4ykcmh9EhCu6c";

export default function CreateEvent(props) {
  const [errorValidation, setErrorValidation] = useState("");
  const [selectedTag, setSelectedTag] = useState("Select a Event");
  const [location, setLocation] = useState("");

  const handleLocationChange = (value) => {
    setLocation(value);
  };

  const handleSelect = (e) => {
    setSelectedTag(e);
  };

  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleFieldChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFieldBlur = (name) => {
    const validationResult = schema.validate(formData, { abortEarly: false });
    if (validationResult.error) {
      const newErrors = validationResult.error.details.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {});
      setErrorValidation(newErrors);
    } else {
      setErrorValidation({});
    }
  };

  return (
    <div>
      <Navbar handlelogout={props.handlelogout} />
      <Form>
        <Container>
          <div className="create-event-container">
            <Row>
              <h1>Basic Info</h1>
              <h6>
                Name your event and tell event-goers why they should come. Add
                details that highlight what makes it unique.
              </h6>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <Form.Group controlId="eventTitle">
                  <CustomLabel>
                    <label className="lead mt-3 mb-1">Event Title</label>
                    <TextInput
                      type="text"
                      value={formData.title}
                      className=""
                      onChange={(e) =>
                        handleFieldChange("title", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("title")}
                      isInvalid={!!errorValidation.title}
                      placeholder={"Be Clear and Descriptive"}
                    />
                  </CustomLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <Form.Group controlId="eventDescription">
                  <CustomLabel>
                    <label className="lead mt-3 mb-1">Event Description</label>
                    <TextInput
                      type="text"
                      value={formData.description}
                      className=""
                      onChange={(e) =>
                        handleFieldChange("description", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("description")}
                      isInvalid={!!errorValidation.description}
                      placeholder={"Tell attendees who is organizing the event"}
                    />
                  </CustomLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <Form.Group controlId="eventTag">
                  <CustomLabel>
                    <label className="lead mt-3 mb-1">Event Tag</label>
                    <Dropdown
                      className="custom-dropdown-width"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Toggle
                        variant="outline-secondary"
                        id="dropdown-basic"
                      >
                        {selectedTag}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Students Organized Events">
                          Students Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Professor Organized Events">
                          Professor Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Speakers Organized Events">
                          Speakers Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Northeastern Management Events">
                          Northeastern Management Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="khoury College Events">
                          khoury College Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="College of Engineering Events">
                          College of Engineering Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="College of Professional Studies Events">
                          College of Professional Studies Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="College of Science Events">
                          College of Science Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Business Management Events">
                          Business Management Events
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </CustomLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <h1>Location</h1>
              <h6>
                Help people in the area discover your event and let attendees
                know where to show up.
              </h6>
            </Row>
            <Row>
              <LocationInput onLocationChange={handleLocationChange} />
            </Row>
            <Row>
              <h1>Date and time</h1>
              <h6>
                Tell event-goers when your event starts and ends so they can
                make plans to attend.
              </h6>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="eventStartTime">
                  <CustomLabel>
                    <label className="lead mt-3 mb-1">
                      Pick Start Date and Time
                    </label>
                    <div className="">
                      <DatePicker defaultValue={new Date()} className="w-3/5" />
                      <TimeInput
                        defaultValue={new Date()}
                        className="w-2/5 mt-0"
                        use12HourClock
                      />
                    </div>
                  </CustomLabel>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="eventEndTime">
                  <CustomLabel>
                    <label className="lead mt-3 mb-1">
                      Pick End Date and Time
                    </label>
                    <div className="">
                      <DatePicker defaultValue={new Date()} className="w-3/5" />
                      <TimeInput
                        defaultValue={new Date()}
                        className="w-2/5 mt-0"
                        use12HourClock
                      />
                    </div>
                  </CustomLabel>
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Container>
      </Form>
      <Footer />
    </div>
  );
}
