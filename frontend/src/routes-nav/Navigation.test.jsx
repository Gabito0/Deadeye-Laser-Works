import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navigation from "./Navigation";
import UserContext from "../auth/UserContext";
import { describe, expect, vitest, test } from "vitest";

const mockLogout = vitest.fn();

describe("Navigation Component", () => {
  const renderNavigation = (currentUser) => {
    return render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <Navigation logout={mockLogout} />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  test("renders navigation links for logged-out users", () => {
    renderNavigation(null);

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  test("renders navigation links for logged-in users", () => {
    const currentUser = { username: "testuser", status: "user" };
    renderNavigation(currentUser);

    expect(screen.getByText(/Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Orders/i)).toBeInTheDocument();
  });

  test("renders admin links for admin users", () => {
    const currentUser = { username: "adminuser", status: "admin" };
    renderNavigation(currentUser);
    const dropdownToggle = screen.getByText(/Admin/i);
    fireEvent.click(dropdownToggle);
    const adminLinksServices = screen.getAllByText(/Services/i);
    expect(adminLinksServices.length).toBeGreaterThan(1);
    const adminLinksOrders = screen.getAllByText(/Orders/i);
    expect(adminLinksOrders.length).toBeGreaterThan(1);
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  });

  test("calls logout function when logout link is clicked", () => {
    const currentUser = { username: "testuser", status: "user" };
    renderNavigation(currentUser);

    fireEvent.click(screen.getByText(/Logout/i));
    expect(mockLogout).toHaveBeenCalled();
  });
});
