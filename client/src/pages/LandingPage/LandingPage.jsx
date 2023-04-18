import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import { Container } from "react-bootstrap";
import MyCarousel from "../../components/Layout/MyCarousel";
import carouselData from "./CarouselData.json";
import CategoryView from "../../components/CategoryView/CategoryView";

export default function LandingPage({ handlelogout }) {
  return (
    <div>
    <Navbar handlelogout={handlelogout} />
      <Container fluid>
        <MyCarousel className="" carouselData={carouselData} />
        {/* Add Events Happening */}
        {/* Add Categories */}
        <CategoryView />
      </Container>
    </div>
  );
}
