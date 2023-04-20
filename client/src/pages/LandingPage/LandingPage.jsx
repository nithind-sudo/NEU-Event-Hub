import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import { Container } from "react-bootstrap";
import MyCarousel from "../../components/Layout/MyCarousel";
import carouselData from "./CarouselData.json";
import CategoryView from "../../components/CategoryView/CategoryView";
import AllEvents from "../AllEvents/AllEvents";
import bannerImage from "../../assets-pack/home/banner.jpeg";
import "./LandingPage.css";

export default function LandingPage(props) {
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
        <AllEvents />
      </Container>
    </div>
  );
}
