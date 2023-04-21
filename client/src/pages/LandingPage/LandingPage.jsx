import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
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
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        // console.log("Response for GET Event Array: ", response);
        if (response.data) {
          setEventArray(response.data.reverse().slice(0, 5));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchEvents();
  }, [eventArray]);
  return (
    <div>
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
          <div id="category">
            <CategoryView />
          </div>

          <MyCarousel className="" carouselData={carouselData} />
          {/* Add Events Happening */}
          {/* Add Categories */}
          <AllEvents
            eventArray={eventArray}
            getList={"Top 5 Latest Events List"}
          />
        </Container>
      </div>
      <Footer />
    </div>
  );
}
