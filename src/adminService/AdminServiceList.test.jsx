import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, expect, test } from "vitest";
import AdminServiceList from "./AdminServiceList";
import UserContext from "../auth/UserContext";
import * as api from "../api/api";

// Mock the API calls
vi.mock("../api/api", () => {
  return {
    __esModule: true, // this property makes it work
    ...vi.importActual("../api/api"),
    getAllServices: vi.fn(),
  };
});

const mockServices = [
  {
    serviceId: 1,
    title: "Service 1",
    description: "Description 1",
    price: 100,
    isActive: true,
  },
  {
    serviceId: 2,
    title: "Service 2",
    description: "Description 2",
    price: 200,
    isActive: true,
  },
];

describe("AdminServiceList Component", () => {
  const renderAdminServiceList = (services = mockServices) => {
    return render(
      <BrowserRouter>
        <UserContext.Provider value={{ services, setServices: vi.fn() }}>
          <AdminServiceList />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  test("renders the service list", async () => {
    api.getAllServices.mockResolvedValueOnce(mockServices);

    renderAdminServiceList();

    expect(screen.getByText(/Manage Services/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Service 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Service 2/i)).toBeInTheDocument();
    });
  });
});
