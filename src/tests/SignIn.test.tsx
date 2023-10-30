import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SignIn } from "../common/components/SignIn";

const handleSubmit = jest.fn();
const onSubmit = jest.fn();

const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigate,
}));

test.skip("Sign In page has Username and Password labels and Sign In button and Forgot Password link", () => {
  render(<SignIn />);
  [/Username/i, /Password/i, /Sign In/i, /Forgot Password?/i].forEach(
    (elementLabel) => {
      const element = screen.getByText(elementLabel);
      expect(element).toBeInTheDocument();
    }
  );
});

test.skip("Required fields Username and Password are empty", async () => {
  render(<SignIn />);
  [/Username/i, /Password/i].forEach((elementLabel) => {
    const element = screen.getByRole("textbox", { name: elementLabel });
    userEvent.type(element, "");
  });

  const submit = screen.getByText(/Sign In/i);

  userEvent.click(submit);

  await waitFor(() => {
    expect(handleSubmit).toBeCalledTimes(1);
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test.skip("Required fields Username and Password are not empty", async () => {
  render(<SignIn />);
  [/Username/i, /Password/i].forEach((elementLabel) => {
    const element = screen.getByRole("textbox", { name: elementLabel });
    userEvent.type(element, "test");
  });

  const submit = screen.getByText(/Sign In/i);

  userEvent.click(submit);

  await waitFor(() => {
    expect(handleSubmit).toBeCalledTimes(1);
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledWith({ username: "test", password: "test" });
  });
});

test.skip("When form is validated user is taken to Home page", () => {
  render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );

  onSubmit({ username: "test", password: "test" });

  expect(mockedNavigate).toBeCalledWith("/home");
  mockedNavigate.mockRestore();
});
