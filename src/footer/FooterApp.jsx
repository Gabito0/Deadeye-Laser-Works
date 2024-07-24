import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** FooterApp component
 *
 * Renders the footer of the Deadeye Laser Works website.
 *
 */

const FooterApp = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <footer className="text-center text-white bg-dark position-abosolute top-0">
      <div className="container p-4 pb-0">
        {!currentUser && (
          <section>
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Register for free</span>
              <Link className="btn btn-outline-light rounded" to={"/signup"}>
                Sign up!
              </Link>
            </p>
          </section>
        )}
      </div>
      <hr className="border-2" />
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2024 Copyright:
        <Link className="text-white" to="/">
          DeadeyeLaserWorks
        </Link>
      </div>
    </footer>
  );
};

export default FooterApp;
