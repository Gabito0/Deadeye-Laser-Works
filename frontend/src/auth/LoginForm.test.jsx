import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, expect, test } from "vitest";

import LoginForm from "./LoginForm";
import UserContext from "./UserContext";

const mockLogin = vi.fn();

describe("LoginForm Component", () => {
  const renderLoginForm = (currentUser = null) => {
    return render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <LoginForm login={mockLogin} />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  test("renders the login form", () => {
    renderLoginForm();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("calls login function on form submission", async () => {
    renderLoginForm();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const rememberMeCheckbox = screen.getByLabelText(/remember me/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(rememberMeCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        { username: "testuser", password: "password" },
        true
      );
    });
  });

  test("displays form errors on unsuccessful login", async () => {
    mockLogin.mockResolvedValueOnce({
      success: false,
      err: ["Invalid credentials"],
    });
    renderLoginForm();

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});
