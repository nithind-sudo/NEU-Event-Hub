import React from "react";
import "../../styles/Footer/Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <p>&copy; 2023 Northeastern Events</p>
        <div className="about">
        <h4>Contact Us</h4>
            <p>
              Northeastern University
              <br />
              360 Huntington Ave, Boston, MA 02115
              <br />
              Email: <a href="mailto:events@northeastern.edu">events@northeastern.edu</a>
            </p>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
