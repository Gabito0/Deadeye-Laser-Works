import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";

import Homepage from "./Homepage";

describe("Homepage Component", () => {
  const renderHomepage = () => {
    return render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
  };

  test("renders Homepage with all sections", () => {
    renderHomepage();

    // Check if the TopSection text is present
    const topSectionText = screen.getByText(
      /Deadeye Laser Works: Precision in Every Mark, Excellence in Every Cut/i
    );
    expect(topSectionText).toBeInTheDocument();

    // Check if the AboutSection heading is present
    const aboutSectionHeading = screen.getByText(/About Deadeye Laser Works/i);
    expect(aboutSectionHeading).toBeInTheDocument();

    // Check if the "Our Services" link is present
    const ourServicesLink = screen.getByText(/Our Services/i);
    expect(ourServicesLink).toBeInTheDocument();
  });
});
