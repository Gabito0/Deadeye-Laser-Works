import React from "react";

/** TopSection component
 *
 * Renders the top section of the homepage with a promotional message.
 */

const TopSection = () => {
  return (
    <section
      className="card col-lg-12 text-center text-white bg-primary border border-0"
      data-bs-theme="dark"
      style={{ height: "70vh" }}
    >
      <div
        className="card-body col-12 position-absolute start-50 translate-middle"
        style={{ top: "50%" }}
      >
        <p className="display-6 card-text">
          Deadeye Laser Works: Precision in Every Mark, Excellence in Every Cut
        </p>
        <a
          type="button"
          className="btn bg-secondary text-primary rounded mt-4"
          href="#about"
        >
          Learn more
        </a>
      </div>
    </section>
  );
};

export default TopSection;
