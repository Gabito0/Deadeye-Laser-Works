import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import AddReviewForm from "./AddReviewForm";

describe("AddReviewForm Component", () => {
  const mockOnSave = vi.fn();
  const mockOnCancel = vi.fn();

  const renderAddReviewForm = () => {
    return render(
      <AddReviewForm onSave={mockOnSave} onCancel={mockOnCancel} />
    );
  };

  test("renders the AddReviewForm", () => {
    renderAddReviewForm();

    expect(screen.getByLabelText(/Review/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
  });

  test("handles input changes", () => {
    renderAddReviewForm();

    const reviewInput = screen.getByLabelText(/Review/i);
    const ratingSelect = screen.getByLabelText(/Rating/i);

    fireEvent.change(reviewInput, { target: { value: "Great service!" } });
    fireEvent.change(ratingSelect, { target: { value: "5" } });

    expect(reviewInput.value).toBe("Great service!");
    expect(ratingSelect.value).toBe("5");
  });

  test("submits the form with correct data", () => {
    renderAddReviewForm();

    const reviewInput = screen.getByLabelText(/Review/i);
    const ratingSelect = screen.getByLabelText(/Rating/i);
    const saveButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(reviewInput, { target: { value: "Great service!" } });
    fireEvent.change(ratingSelect, { target: { value: "5" } });
    fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
      reviewText: "Great service!",
      rating: 5,
    });
  });

  test("calls onCancel when the cancel button is clicked", () => {
    renderAddReviewForm();

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });
});
