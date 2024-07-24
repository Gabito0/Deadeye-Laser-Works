import React, { useState } from "react";
import { Link } from "react-router-dom";

/** VerificationAlert component
 *
 * Renders an alert to inform the user that their email is not verified.
 * The alert can be dismissed by the user
 *
 */

const VerificationAlert = ({ currentUser }) => {
  const [visible, setVisible] = useState(true);

  if (!visible || currentUser.isVerified) return null;

  return (
    <div
      className="alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      Your email is not verified. Please{" "}
      <Link to="/user/profile">verify your email</Link>.
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={() => setVisible(false)}
      ></button>
    </div>
  );
};

export default VerificationAlert;
