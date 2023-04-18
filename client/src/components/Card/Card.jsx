import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "./styles/Card.css";
import crackersImage from "../../assets/images/crackersImage.jpeg";
import crackersImageNew from "../../assets/images/crackersImageBack.jpeg";
import crackersImageInsertFlip from "../../assets/images/crackersImageBackNew.jpeg";

const Card = ({ eventName, eventDescription, eventID, eventDate }) => {
  const ref = React.useRef();
  const cardStyle = {
    width: "500px",
    height: "250px",
    borderRadius: "10px",
  };
  const backgroundImageStyle = {
    backgroundImage: eventID&1?`url(${crackersImage})`:`url(${crackersImageNew})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px"
  };
  const backgroundImageStyleBack = {
    backgroundImage: `url(${crackersImageInsertFlip})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px"
  };
  return (
    <Flippy
      flipOnHover={false}
      flipOnClick={true}
      flipDirection="horizontal"
      ref={ref}
      style={cardStyle}>
      <FrontSide
        style={backgroundImageStyle}
        onClick={() => {
          ref.current.toggle();
        }}>
        <div className="eventName my-1">
          <div className="row text-light">
            <div className="text-center">
              <div className="h5">{eventName}</div>
            </div>
          </div>
        </div>

        <div className="eventID my-1">
          <div className="row text-light">
            <div className="text-center">
              <div className="h5">Event ID: {eventID}</div>
            </div>
          </div>
        </div>

        <div className="bookNowButton my-3">
          <div className="row text-light">
            <div className="text-center">
              <div className="h5">Date: {eventDate}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="text-center justify-content-center align-items-center">
                <button className="btn btn-warning">View Event</button>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="text-center justify-content-center align-items-center">
                <button className="btn btn-success">Register Now</button>
              </div>
            </div>
          </div>
        </div>
      </FrontSide>

      <BackSide style={backgroundImageStyleBack}>
        <div className="description">
          <div className="row text-light">
            <div className="text-center justify-content-center align-items-center">
              <div className="p">{eventDescription}</div>
            </div>
          </div>
        </div>
      </BackSide>
    </Flippy>
  );
};

export default Card;
