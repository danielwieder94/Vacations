import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import React from "react";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Login", () => {
  it("should navigate to the home page when the user is logged in", () => {
    const mockNavigate = jest.fn();
    const useNavigateMock = useNavigate as jest.Mock;
    useNavigateMock.mockReturnValue(mockNavigate);

    render(<Login />);
    const loginButton = screen.getByTestId("loginBtn");
    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledWith("/vacationList");
  });
});

//   it("login button is clickable", () => {
//     render(<Login />);
//     const loginButton = screen.getByTestId("loginBtn");
//     fireEvent.click(loginButton);
//   });
