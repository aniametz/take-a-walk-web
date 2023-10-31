import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages/home";

describe("Home", () => {
  it("Home page renders text", () => {
    render(<Home />);
    const element = screen.getByText(/Home Page/i);
    expect(element).toBeInTheDocument();
  });
});
