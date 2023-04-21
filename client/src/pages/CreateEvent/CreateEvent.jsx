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
import Button from "../../components/ui/Button";
import { fetchCreateEvent } from "../../apiClient";
import { EventManagementState } from "../../contexts/context";
import MyToast from "../../components/ui/Toast";

export default function CreateEvent({
  handlelogout,
  showAlert,
  setShowAlert,
  setError,
  error
}) {
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    imageUrl: Joi.string().uri().trim().required(),
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const [errorValidation, setErrorValidation] = useState("");
  const [selectedTag, setSelectedTag] = useState("Select a Event");
  const [enteredlocation, setEnteredLocation] = useState("");
  const [alertClass, setAlertClass] = useState("danger");

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const { state, dispatch } = EventManagementState();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  const handleLocationChange = (value) => {
    setEnteredLocation(value);
  };

  const handleSelect = (e) => {
    setSelectedTag(e);
  };

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

  const handleCreateEvent = async (e) => {
    const mapsLocation = enteredlocation;
    console.log("LAT and LONG for location : ", {
      lat: parseFloat(mapsLocation.split(",")[0]),
      lng: parseFloat(mapsLocation.split(",")[1]),
    });
    e.preventDefault();
    const payload = {
      title: formData.title,
      description: formData.description,
      location: {
        lat: mapsLocation.split(",")[0],
        lng: mapsLocation.split(",")[1],
      },
      category: selectedTag,
      date: startDate.toISOString().substr(0, 10),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      organizer: state.user_id,
      imageUrl: formData.imageUrl,
    };
    try {
      const response = await fetchCreateEvent(payload);
      console.log(
        ` *** Response from Create Event End Point : ${response.data}`
      );
      if (response.data.success) {
        setShowAlert(true);
        setAlertClass("success");
        setError("Event Created Successfully!!!");
        setTimeout(() => {
          navigate("/main");
        }, 2000);
      } else {
        setAlertClass("Danger");
        setError("Invalid Data In Form");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertClass("Danger");
      setError("Invalid Data In Form");
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Navbar handlelogout={handlelogout} />
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
                      className="custom-dropdown custom-dropdown-width"
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
                        <Dropdown.Item eventKey="Professors Organized Events">
                        Professors Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Speakers Organized Events">
                        Speakers Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Northeastern's Management Events">
                        Northeastern's Management Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Khoury College of Computer Science Organized Events">
                        Khoury College of Computer Science Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="College of Engineering Organized Events">
                        College of Engineering Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="College of Professional Studies Organized Events">
                        College of Professional Studies Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="College of Science Organized Events">
                        College of Science Organized Events
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="D'Amore College of Management Events">
                        D'Amore College of Management Events
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
                      <DatePicker
                        defaultValue={new Date()}
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-3/5"
                      />
                      <TimeInput
                        defaultValue={new Date()}
                        value={startTime}
                        onChange={handleStartTimeChange}
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
                      <DatePicker
                        defaultValue={new Date()}
                        value={endDate}
                        onChange={handleEndDateChange}
                        className="w-3/5"
                      />
                      <TimeInput
                        defaultValue={new Date()}
                        value={endTime}
                        onChange={handleEndTimeChange}
                        className="w-2/5 mt-0"
                        use12HourClock
                      />
                    </div>
                  </CustomLabel>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col>
                <Form.Group controlId="eventImageURL">
                  <CustomLabel>
                    <label className="lead mt-3 mb-1">Event Image Url</label>
                    <TextInput
                      type="text"
                      value={formData.imageUrl}
                      className=""
                      onChange={(e) =>
                        handleFieldChange("imageUrl", e.target.value)
                      }
                      onBlur={() => handleFieldBlur("imageUrl")}
                      isInvalid={!!errorValidation.imageUrl}
                      placeholder={"https://example.com/images/123.jpeg"}
                    />
                  </CustomLabel>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="danger"
              text={"Create Event"}
              onClick={handleCreateEvent}
              className="mt-3 mb-1"
            ></Button>
          </div>
        </Container>
      </Form>
      {showAlert && (
        <MyToast
          bg={"danger"}
          show={showAlert}
          onClose={() => {setShowAlert(false);setError("")}}
          message={error}
        />
      )}
    </div>
  );
}
