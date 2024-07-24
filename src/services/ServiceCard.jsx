import React from "react";
import { Link } from "react-router-dom";
import "./ServiceCard.css";

/** ServiceCard component
 *
 * Renders a card displaying information about a service, including the title, description, and price.
 * It provides a link to the detailed view of the service.
 */

const ServiceCard = ({ serviceId, title, description, price }) => {
  console.log("serviceId", serviceId);
  return (
    <Link
      to={`/services/${serviceId}`}
      className="text-decoration-none text-dark text-center service-link"
    >
      <div className="card shadow-lg h-100 rounded">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text flex-grow-1">{description}</p>
          <div className="pb-4">
            <button className="btn text-info">Learn More</button>
          </div>
          <p className="card-text">
            <strong>Price:</strong> ${price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
