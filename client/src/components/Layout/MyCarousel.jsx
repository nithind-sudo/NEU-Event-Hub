import { Carousel } from "react-bootstrap";
import holi from "../../assets/holi.jpeg";
import professorsOrganized from "../../assets/professorsOrganized.jpeg";
import React from "react";

export default function MyCarousel({ carouselData }) {
  console.log("carousel Data :", carouselData);
  return (
    <Carousel>
      {/* <h1>This is Carousel Page</h1> */}
      {/* {carouselData.map((item, index) => {
        console.log("Inside Map for Item : ", item, "Index : ", index);
        <Carousel.Item key={index}>
          <img src={item.img} className="d-block w-100" alt={item.title} />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>;
      })} */}
      <Carousel.Item>
        <img className="d-block w-100" src={holi} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={professorsOrganized}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
