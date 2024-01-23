import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LogIn } from "./LogIn";
import { BrowserRouter } from "react-router-dom";

// Mocking the fetch function
const mockFetch = jest.fn();
global.fetch = mockFetch as jest.Mock;

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => jest.fn(),
}));

test("renders learn react link", () => {
  render(<BrowserRouter><LogIn /></BrowserRouter>);
  const linkElement = screen.getByText(/Ingrese/i);
  expect(linkElement).toBeInTheDocument();
});

describe("login", () => {
  test("LogIn must have logo image", () => {
    render(<BrowserRouter><LogIn /></BrowserRouter>);
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "logo-burger.png");
    expect(logo).toHaveAttribute("alt", "logo");
  });
  test("email field should have label", () => {
    render(<BrowserRouter><LogIn /></BrowserRouter>);
    const emailInputNode = screen.getByText("Ingrese su e-mail");
    expect(emailInputNode).toBeInTheDocument();
  });
  test("LogIn must have a password label", () => {
    render(<BrowserRouter><LogIn /></BrowserRouter>);
    const labelPassword = screen.getByText("Contraseña");
    expect(labelPassword).toBeInTheDocument();
  });
  test("should call handle submit and call Login endpoint", async () => {
    render(<BrowserRouter><LogIn /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText("Ingresar email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "testPassword" },
    });

    // Mock the fetch response
    const mockResponse = {
      accessToken: "mockAccessToken",
      user: { email: "test@example.com" },
    };
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    } as any);

    // Trigger form submission
    fireEvent.click(screen.getByText("Iniciar Sesión"));

    // Wait for the asynchronous code to execute
    await waitFor(() => {
      // Check if fetch is called with the correct parameters
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "testPassword",
        }),
      });
      // Check if localStorage is updated
      expect(localStorage.getItem("accessToken")).toBe("mockAccessToken");
      expect(localStorage.getItem("email")).toBe("test@example.com");
    });
  });
});
