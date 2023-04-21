import React from 'react';
import './AboutMePage.css';
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/footer";

function AboutMePage() {
  return (
    <div className="about-me">
      <Navbar />
      <div className="about-container">
      <h1 className="about-title">About NEU Event HUB</h1>
      <p className="about-text">Welcome to NEU Event HUB, the online platform for buying and selling event tickets.</p>
      <p className="about-text">Our mission is to connect students with live entertainment experiences and to make it easier for them to enjoy their favorite events, whether it's a music concert, a sports game, a theater show, or any other type of live event.</p>
      <p className="about-text">We provide a secure, reliable, and user-friendly platform for buying and selling tickets, and we offer a wide range of services to help students get the most out of their event experience.</p>
      <h2 className="about-section-title">Our Services</h2>
      <ul className="about-list">
        <li className="about-list-item">Event Search: Our powerful search engine makes it easy to find events by location, date, artist, or team.</li>
        <li className="about-list-item">Ticket Sales: We provide a safe and reliable platform for buying and selling tickets, with a range of payment options and delivery methods.</li>
        <li className="about-list-item">Event Alerts: Fans can sign up for event alerts to stay informed about upcoming events in their area.</li>
        <li className="about-list-item">Customer Support: Our dedicated customer support team is available 24/7 to assist with any questions or issues.</li>
      </ul>
      <h2 className="about-section-title">Contact Us</h2>
      <ul className="about-list">
        <li className="about-list-item">Phone: <a href="tel:1-800-653-8000" className="about-link">1-800-653-8000</a></li>
        <li className="about-list-item">Email: <a href="mailto:events@northeastern.edu" className="about-link"> events@northeastern.edu</a></li>
        <li className="about-list-item">Address: 360 Huntington Ave, Boston, MA 02115</li>
      </ul>
    </div>
      <Footer/>
    </div>
  );
}

export default AboutMePage;

