import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import { Container } from "react-bootstrap";
import MyCarousel from "../../components/Layout/MyCarousel";
import carouselData from "./CarouselData.json";
import CategoryView from "../../components/CategoryView/CategoryView";
import AllEvents from "../AllEvents/AllEvents";

export default function LandingPage({ handleLogout }) {
  return (
    <div className="pb-5">
    <Navbar handleLogout={handleLogout} />
      <Container fluid>
        <MyCarousel className="" carouselData={carouselData} />
        {/* Add Events Happening */}
        {/* Add Categories */}
        <CategoryView />
        <AllEvents />
      </Container>
    </div>
  );
}
