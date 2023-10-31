import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Index from "../pages/index";

describe("Index", () => {
  it("Index page renders text", () => {
    render(<Index />);
    const element = screen.getByText(/Welcome! Take a Walk With Us./i);

    expect(element).toBeInTheDocument();
  });

  it("Index page has Sign In button that navigates to Sign In page", () => {
    render(<Index />);
    const element = screen.getByText(/Sign In/i);
    const linkElement = screen.getByLabelText(/SignIn/i);

    expect(element).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/sign-in");
  });

  it("Index page has Sign Up button that navigates to Sign Up page", () => {
    render(<Index />);
    const element = screen.getByText(/Sign Up/i);
    const linkElement = screen.getByLabelText(/SignUp/i);

    expect(element).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/sign-up");
  });

  it("Index page has Guest button that navigates to Home page", () => {
    render(<Index />);
    const element = screen.getByText(/Guest/i);
    const linkElement = screen.getByLabelText(/Guest/i);

    expect(element).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/home");
  });
});
