import { Carousel } from "react-bootstrap";

import React from "react";

export default function MyCarousel({ carouselData }) {
  return (
    <Carousel>
      <h1>This is Carousel Page</h1>
      {carouselData.map((item, index) => {
        <Carousel.Item key={index}>
          <img src={item.img} className="d-block w-100" alt={item.title} />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>;
      })}
    </Carousel>
  );
}
