import React from "react";
import "../../styles/Footer/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-white py-5" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 mb-4">
            <p className="text-lg-left text-md-left text-center">
              &copy; 2023 Northeastern Events
            </p>
            <ul className="list-unstyled text-lg-left text-md-left text-center">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 mb-4">
            <div className="about text-center">
              <h4>Contact Us</h4>
              <p>
                Northeastern University
                <br />
                360 Huntington Ave, Boston, MA 02115
                <br />
                Email:{" "}
                <Link to="mailto:events@northeastern.edu" className="text-white">
                  events@northeastern.edu
                </Link>
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12 mb-4">
            <div className="subscribe text-lg-right text-md-right text-center">
              <h4>Subscribe</h4>
              <form className="px-5">
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your Email ID"
                    name="email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company"
                    name="company"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
