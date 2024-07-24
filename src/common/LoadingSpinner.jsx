import React from "react";
import "./LoadingSpinner.css";

/** LoadingSpinner component
 *
 * Renders a loading spinner animation.
 */
const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
