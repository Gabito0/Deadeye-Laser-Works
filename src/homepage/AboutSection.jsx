import React from "react";
import { Link } from "react-router-dom";

/** AboutSection component
 *
 * Renders the "About" section of the Deadeye Laser Works website.
 *
 *
 */

const AboutSection = () => {
  return (
    <section id="about" className="container mt-5">
      <div className="row">
        <div className="col-12 text-center">
          <h2>About Deadeye Laser Works</h2>
          <p className="lead text-primary">
            At Deadeye Laser Works, we are dedicated to transforming the
            ordinary into the extraordinary. Our passion for precision and
            excellence drives us to deliver unmatched laser engraving services,
            making us the trusted choice for all your metal customization needs.
          </p>
        </div>
      </div>
      <div className="row mt-4 gap-4 gap-sm-4 justify-content-center">
        <div className="col-md-4 text-center border border-dark rounded pt-2">
          <h3>Laser Engraving</h3>
          <p className="fw-medium">
            From intricate designs on knives and firearms to personalized metal
            cards, we ensure every detail is perfect.
          </p>
        </div>
        <div className="col-md-4 text-center border border-dark rounded pt-2">
          <h3>Gold Plating</h3>
          <p className="fw-medium">
            Elevate your items with our premium gold plating service, turning
            ordinary metal into luxurious, gold-finished masterpieces.
          </p>
        </div>
        <div className="col-md-4 text-center border border-dark rounded pt-2">
          <h3>Custom Designs</h3>
          <p className="fw-medium">
            Our expert team crafts unique, custom designs that reflect your
            style and vision, whether for personal keepsakes or distinctive
            business solutions.
          </p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 text-center">
          <p className="fw-medium">
            At Deadeye Laser Works, we believe in turning your ideas into
            reality. Whether you’re looking to personalize a gift, enhance your
            business branding, or simply add a touch of elegance to your
            belongings, we’ve got you covered. Discover the art of precision
            with Deadeye Laser Works.
          </p>
        </div>
      </div>
      <div className="text-center fs-4">
        <Link
          to="/services"
          className="btn btn-dark col-12 col-sm-8 col-md-5 my-5 rounded shadow-lg"
        >
          Our Services
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;
