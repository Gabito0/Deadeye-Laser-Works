import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import OrderList from "./AdminOrderList";
import DeadEyeLaserWorksApi from "../api/api";

vi.mock("../api/api");

describe("OrderList Component", () => {
  const mockUserServices = [
    {
      userServiceId: 1,
      username: "testuser1",
      title: "Service 1",
      additionInfo: "Additional info 1",
      isCompleted: false,
      confirmedPrice: 100,
    },
    {
      userServiceId: 2,
      username: "testuser2",
      title: "Service 2",
      additionInfo: "Additional info 2",
      isCompleted: true,
      confirmedPrice: 200,
    },
  ];

  beforeEach(() => {
    DeadEyeLaserWorksApi.getAllUsersServices.mockResolvedValue(
      mockUserServices
    );
  });

  const renderOrderList = () => {
    return render(
      <BrowserRouter>
        <OrderList />
      </BrowserRouter>
    );
  };

  test("renders the OrderList and displays user services", async () => {
    renderOrderList();

    // Check if the loading spinner is displayed initially by its class name
    expect(document.querySelector(".spinner-container")).toBeInTheDocument();

    await waitFor(() => {
      // Check if the order history heading is present
      expect(screen.getByText(/Order History/i)).toBeInTheDocument();

      // Check if the user services are displayed
      expect(screen.getByText(/testuser1/i)).toBeInTheDocument();
      expect(screen.getByText(/testuser2/i)).toBeInTheDocument();
      expect(screen.getByText(/Service 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Service 2/i)).toBeInTheDocument();
      expect(screen.getByText(/Additional info 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Additional info 2/i)).toBeInTheDocument();
      expect(screen.getByText(/100/i)).toBeInTheDocument();
      expect(screen.getByText(/200/i)).toBeInTheDocument();
    });
  });

  test("displays an error message when there is an error loading the orders", async () => {
    DeadEyeLaserWorksApi.getAllUsersServices.mockRejectedValueOnce(
      new Error("Failed to fetch user services")
    );

    renderOrderList();

    await waitFor(() => {
      expect(
        screen.getByText(/There was an error loading the orders./i)
      ).toBeInTheDocument();
    });
  });

  test("displays 'No orders available.' when there are no user services", async () => {
    DeadEyeLaserWorksApi.getAllUsersServices.mockResolvedValueOnce([]);

    renderOrderList();

    await waitFor(() => {
      expect(screen.getByText(/No orders available./i)).toBeInTheDocument();
    });
  });
});
