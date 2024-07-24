import React, { useContext, useEffect } from "react";
import TopSection from "./TopSection";
import AboutSection from "./AboutSection";

/** Homepage component
 *
 * Renders the homepage of the Deadeye Laser Works website.
 *
 */

const Homepage = () => {
  return (
    <>
      <TopSection />
      <AboutSection />
    </>
  );
};

export default Homepage;
