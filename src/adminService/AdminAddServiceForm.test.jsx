import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AddServiceForm from "./AdminAddServiceForm";
import DeadEyeLaserWorksApi from "../api/api";

vi.mock("../api/api");

describe("AddServiceForm Component", () => {
  const mockOnServiceAdd = vi.fn();
  const mockOnCancel = vi.fn();

  const renderAddServiceForm = () => {
    return render(
      <AddServiceForm onServiceAdd={mockOnServiceAdd} onCancel={mockOnCancel} />
    );
  };

  test("renders AddServiceForm and submits new service", async () => {
    DeadEyeLaserWorksApi.addService.mockResolvedValueOnce({
      serviceId: 1,
      title: "Test Service",
      description: "Test Description",
      price: 100,
      isActive: true,
    });

    renderAddServiceForm();

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Test Service" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/active/i), {
      target: { value: "true" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /add service/i }));

    await waitFor(() => {
      expect(mockOnServiceAdd).toHaveBeenCalledWith({
        serviceId: 1,
        title: "Test Service",
        description: "Test Description",
        price: 100,
        isActive: true,
      });
    });

    // Check if the form is reset after submission
    expect(screen.getByLabelText(/title/i).value).toBe("");
    expect(screen.getByLabelText(/description/i).value).toBe("");
    expect(screen.getByLabelText(/price/i).value).toBe("");
    expect(screen.getByLabelText(/active/i).value).toBe("true");
  });

  test("calls onCancel when cancel button is clicked", () => {
    renderAddServiceForm();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
