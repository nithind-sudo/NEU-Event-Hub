import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Layout/Footer";
import { Container } from "react-bootstrap";
import MyCarousel from "../../components/Layout/MyCarousel";
import carouselData from "./CarouselData.json";

export default function LandingPage() {
  return (
    <Container fluid>
      <Navbar />
      <MyCarousel className="" carouselData={carouselData} />
      {/* Add Events Happening */}
      {/* Add Categories */}
      <Footer />
    </Container>
  );
}
