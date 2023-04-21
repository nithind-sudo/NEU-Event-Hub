import React from "react";
import { Link } from "react-router-dom";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import "./styles/Card.css";
import crackersImage from "../../assets/images/crackersImage.jpeg";
import crackersImageNew from "../../assets/images/crackersImageBack.jpeg";
import crackersImageInsertFlip from "../../assets/images/crackersImageBackNew.jpeg";

const Card = ({
  eventName,
  eventDescription,
  eventID,
  eventDate,
  eventImage,
  handleViewEvent,
}) => {
  const ref = React.useRef();

  const cardStyle = {
    width: "320px",
    height: "160px",
    borderRadius: "10px",
  };

  const backgroundImageStyle = {
    // backgroundImage: eventID&1?`url(${crackersImage})`:`url(${crackersImageNew})`,
    backgroundImage: `url(${eventImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
  };

  const backgroundImageStyleBack = {
    backgroundImage: `url(${crackersImageInsertFlip})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
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
              <div className="h6">{eventName}</div>
            </div>
          </div>
        </div>

        <div className="eventID my-1">
          <div className="row text-light">
            <div className="text-center">
              <div className="h6">Event ID: {eventID}</div>
            </div>
          </div>
        </div>

        <div className="bookNowButton">
          <div className="row text-light">
            <div className="text-center">
              <div className="h6">Date: {eventDate}</div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
            <div className="text-center justify-content-center align-items-center">
              <div className="text-center justify-content-center align-items-center my-1">
                <button
                  className="btn btn-warning setBtnStyleCard"
                  onClick={() =>
                    handleViewEvent({
                      eventName,
                      eventID,
                      eventDescription,
                      eventDate,
                    })
                  }>
                  View Event
                </button>
              </div>
              </div>
              </div>
            <div className="col-6">
              <div className="text-center justify-content-center align-items-center my-1">
                <button className="btn btn-success setBtnStyleCard">Register Now</button>
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
