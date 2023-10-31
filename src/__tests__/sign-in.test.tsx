import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignIn from "../pages/sign-in";

jest.mock("../utils/functions", () => ({
  submitSignInData: jest.fn(),
}));

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

describe("SignIn", () => {
  it.skip("Sign In page has Username and Password labels and Sign In button and Forgot Password link", () => {
    render(<SignIn />);
    [/Username/i, /Password/i, /Sign In/i, /Forgot Password?/i].forEach(
      (elementLabel) => {
        const element = screen.getByText(elementLabel);
        expect(element).toBeInTheDocument();
      }
    );
  });

  it.skip("Required fields Username and Password are empty", async () => {
    render(<SignIn />);
    [/Username/i, /Password/i].forEach((elementLabel) => {
      const element = screen.getByRole("textbox", { name: elementLabel });
      userEvent.type(element, "");
    });

    const submit = screen.getByText(/Sign In/i);

    userEvent.click(submit);
  });

  it.skip("Required fields Username and Password are not empty", async () => {
    render(<SignIn />);
    [/Username/i, /Password/i].forEach((elementLabel) => {
      const element = screen.getByRole("textbox", { name: elementLabel });
      userEvent.type(element, "test");
    });

    const submit = screen.getByText(/Sign In/i);

    userEvent.click(submit);
  });

  it.skip("When form is validated user is taken to Home page", () => {
    render(<SignIn />);
  });
});
