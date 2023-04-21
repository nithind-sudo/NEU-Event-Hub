import "./CreateEvent.css";
import Footer from "../../components/Footer/footer";
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
import TextArea from "../../components/form/TextArea";

export default function CreateEvent({
  handlelogout,
  showAlert,
  setShowAlert,
  setError,
  error,
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
    // console.log("LAT and LONG for location : ", {
    //   lat: parseFloat(mapsLocation.split(",")[0]),
    //   lng: parseFloat(mapsLocation.split(",")[1]),
    // });
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
      // console.log(
      //   ` *** Response from Create Event End Point : ${response.data}`
      // );
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
      <div className="py-5 setBackgroundForCreateEvent">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-3 col-xl-3"></div>
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
              <div class="card text-dark">
                <div class="card-body">
                  <div className="container">
                    <div class="card-title display-6">Create Event</div>
                    <div class="card-title h6">
                      You're an Admin. You can create an Event!
                    </div>
                  </div>
                  <div class="card-subtitle mb-2 text-body-secondary">
                    <div className="container">
                      <div className="row">
                        <label className="lead mt-3 mb-1">Event Title</label>
                        <div className="container">
                          <TextInput
                            type="text"
                            value={formData.title}
                            className=""
                            onChange={(e) =>
                              handleFieldChange("title", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("title")}
                            isInvalid={!!errorValidation.title}
                            placeholder={"Enter your Event Title"}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="lead mt-3 mb-1">
                          Event Description
                        </label>
                        <div className="container">
                          <TextArea
                            type="text"
                            value={formData.description}
                            className=""
                            onChange={(e) =>
                              handleFieldChange("description", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("description")}
                            isInvalid={!!errorValidation.description}
                            placeholder={
                              "Tell attendees who is organizing the event"
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <label className="lead mt-3 mb-1">
                          Who is Organizing this Event?
                        </label>
                        <Dropdown className="" onSelect={handleSelect}>
                          <Dropdown.Toggle
                            variant="outline-secondary"
                            id="dropdown-basic"
                            style={{ width: "100%" }}>
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
                              Khoury College of Computer Science Organized
                              Events
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
                      </div>
                      <div className="row">
                        <label className="lead mt-3 mb-1">
                          Venue (Enter through Google Maps down below)
                        </label>
                        <LocationInput
                          className="signup-input"
                          onLocationChange={handleLocationChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <label className="lead mt-3 mb-1">
                            Start Date and Time
                          </label>
                          <div>
                            <DatePicker
                              defaultValue={new Date()}
                              value={startDate}
                              onChange={handleStartDateChange}
                              className="w-3/5"
                            />
                            <br />
                            <TimeInput
                              defaultValue={new Date()}
                              value={startTime}
                              onChange={handleStartTimeChange}
                              className="w-2/5 mt-0"
                              use12HourClock
                            />
                          </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <label className="lead mt-3 mb-1">
                            End Date and Time
                          </label>
                          <div>
                            <DatePicker
                              defaultValue={new Date()}
                              value={endDate}
                              onChange={handleEndDateChange}
                              className="w-3/5"
                            />
                            <br />
                            <TimeInput
                              defaultValue={new Date()}
                              value={endTime}
                              onChange={handleEndTimeChange}
                              className="w-2/5 mt-0"
                              use12HourClock
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <label className="lead mt-3 mb-1">
                          Event Image URL
                        </label>
                        <div className="container">
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
                        </div>
                      </div>
                      <div className="row">
                        <Button
                          variant="success"
                          text={"Create Event"}
                          onClick={handleCreateEvent}
                          className="mt-3 mb-1"></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-3 col-xl-3"></div>
          </div>
        </div>
      </div>
      {showAlert && (
        <MyToast
          bg={"danger"}
          show={showAlert}
          onClose={() => {
            setShowAlert(false);
            setError("");
          }}
          message={error}
        />
      )}
      <Footer />
    </div>
  );
}
