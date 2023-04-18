import { Carousel } from "react-bootstrap";
import holi from "../../assets/holi.jpeg";
import garageBand from "../../assets/images/garageBand.jpeg";
import audience from "../../assets/images/audience.jpeg";
import disco from "../../assets/images/disco.jpeg";
import concert from "../../assets/images/concert.jpeg";
import professorsOrganized from "../../assets/professorsOrganized.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React from "react";
import "./Carousel.css";

export default function MyCarousel({ carouselData }) {
  
  console.log("carousel Data :", carouselData);
  return (
    <div className="my-3">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={3}
        loop={true}
        navigation={true}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="mySwiper">
        <SwiperSlide>
          <img className="carousel-image" src={holi} alt="First slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="carousel-image" src={garageBand} alt="Second slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="carousel-image" src={audience} alt="Third slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="carousel-image" src={concert} alt="Fourth slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="carousel-image" src={disco} alt="Fift slide" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
  /*
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
  */
}
