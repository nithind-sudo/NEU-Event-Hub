import "./CreateEvent.css";
import Footer from "../../components/Layout/Footer";
import { Row, Col, Container, Form } from "react-bootstrap";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TextInput from "../../components/form/TextInput";
import CustomLabel from "../../components/form/Label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent(props) {
  const [formData, setFormData] = useState({
    title : "",
    description : "",
    email: "",
    phoneNumber: "",
    tags : "",
  });

  return (
    <div>
      <Navbar handlelogout={props.handlelogout} />
      <Form>
        <Container>
          <div className="create-event-container">
            <Row className="justify-content-center">
              <Col>
                <Form.Group controlId="userFirstName">
                  <CustomLabel>
                    <label className="lead mt-3 mb-1">First Name</label>
                    <TextInput
                      type="text"
                      // value={formData.firstName}
                      className="signup-input"
                      // onChange={(e) =>
                      //   handleFieldChange("firstName", e.target.value)
                      // }
                      // onBlur={() => handleFieldBlur("firstName")}
                      // isInvalid={!!errorValidation.firstName}
                      // placeholder={"Enter your First Name"}
                    />
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
