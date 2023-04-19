import React from "react";
import "../../styles/Footer/Footer.css";

const Footer = () => {
  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <p>&copy; 2023 Northeastern Events</p>
          </div>
          <div className="col-lg-6">
            <div className="about">
              <h4>Contact Us</h4>
              <p>
                Northeastern University
                <br />
                360 Huntington Ave, Boston, MA 02115
                <br />
                Email:{" "}
                <a href="mailto:events@northeastern.edu" className="text-white">
                  events@northeastern.edu
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;