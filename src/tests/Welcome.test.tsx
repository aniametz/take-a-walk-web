import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Welcome } from "../common/components/Welcome";

const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigate,
}));

test("Welcome page renders text", () => {
  render(
    <BrowserRouter>
      <Welcome />
    </BrowserRouter>
  );
  const element = screen.getByText(/Welcome! Take a Walk With Us./i);
  expect(element).toBeInTheDocument();
});

test("Welcome page has Sign In button that navigates to Sign In page", () => {
  render(
    <BrowserRouter>
      <Welcome />
    </BrowserRouter>
  );
  const element = screen.getByText(/Sign In/i);
  expect(element).toBeInTheDocument();

  fireEvent.click(element);
  expect(mockedNavigate).toBeCalledWith("/sign-in");
  mockedNavigate.mockRestore();
});

test("Welcome page has Sign Up button that navigates to Sign Up page", () => {
  render(
    <BrowserRouter>
      <Welcome />
    </BrowserRouter>
  );
  const element = screen.getByText(/Sign Up/i);
  expect(element).toBeInTheDocument();

  fireEvent.click(element);
  expect(mockedNavigate).toBeCalledWith("/sign-up");
  mockedNavigate.mockRestore();
});

test("Welcome page has Guest button that navigates to Home page", () => {
  render(
    <BrowserRouter>
      <Welcome />
    </BrowserRouter>
  );
  const element = screen.getByText(/Guest/i);
  expect(element).toBeInTheDocument();

  fireEvent.click(element);
  expect(mockedNavigate).toBeCalledWith("/home");
  mockedNavigate.mockRestore();
});
