import React from 'react';
import './AboutMePage.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";

function AboutMePage() {
  return (
    <div className="about-me">
      <Navbar />
      <h1>Northeastern University</h1>
      <p>This is the About Page </p>
      <p>Here we can create events and book events as well!</p>
      <p>This is a plcae where all Northeasterins can come and book tickts for their favorite event</p>
      <Footer/>
    </div>
  );
}

export default AboutMePage;