import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import { Container } from "react-bootstrap";
import MyCarousel from "../../components/Layout/MyCarousel";
import carouselData from "./CarouselData.json";
import CategoryView from "../../components/CategoryView/CategoryView";
import AllEvents from "../AllEvents/AllEvents";
import bannerImage from "../../assets-pack/home/banner.jpeg";
import "./LandingPage.css";
import { getAllEvents } from "../../apiClient";

export default function LandingPage(props) {
  const [eventArray, setEventArray] = useState([]);
  const [eventArraySix, setEventArraySix] = useState([]);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        console.log("Response for GET Event Array: ", response);
          if (response.data) {
            setEventArray(response.data.reverse());
            if(eventArray.length>6) {
              setEventArraySix(eventArray.slice(0, 5));
            }
            else {
              setEventArraySix(eventArray);
            }
          }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvents();
  }, []);
  return (
    <div className="pb-5">
      <div className="container">
        <div className="row">
          <img
            src={bannerImage}
            alt="Banner Image"
            className="bannerImageStyle mt-5 pt-4"
          />
        </div>
      </div>

      <Navbar handlelogout={props.handlelogout} />
      <Container fluid>
        <CategoryView />
        <MyCarousel className="" carouselData={carouselData} />
        {/* Add Events Happening */}
        {/* Add Categories */}
        <AllEvents eventArray={eventArraySix} getList={"Top 5 Latest Events List"} />
      </Container>
    </div>
  );
}
