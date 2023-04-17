import { Carousel } from "react-bootstrap";
import holi from "../../assets/holi.jpeg";
import professorsOrganized from "../../assets/professorsOrganized.jpeg";
import React from "react";
import "./Carousel.css";

export default function MyCarousel({ carouselData }) {
  console.log("carousel Data :", carouselData);
  return (
    <Carousel>
      <Carousel.Item>
        <img className="carousel-image" src={holi} alt="First slide" />
        <Carousel.Caption>
          <h3>Holi</h3>
          <p>
            Holi is a Hindu spring festival, also known as the "Festival of
            Colors" or the "Festival of Love", which is celebrated by throwing
            colored powders and water on each other to signify the triumph of
            good over evil.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="carousel-image"
          src={professorsOrganized}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Resume Review</h3>
          <p>
            Opportunity for job seekers to have their resumes critiqued by
            industry professionals to improve their chances of getting hired
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
