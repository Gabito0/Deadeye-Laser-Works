import React from "react";

/** StarRating component
 *
 * Renders a star rating based on the provided rating value.
 
 */

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "text-warning" : "text-muted"}>
        &#9733;
      </span>
    );
  }
  return <>{stars}</>;
};

export default StarRating;
