import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SignUp } from "../common/components/SignUp";

const handleSubmit = jest.fn();
const onSubmit = jest.fn();

const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigate,
}));

test("Sign Up page has Username, Email, Password and Confirm Password labels and Sign Up button", () => {
  render(<SignUp />);
  [/Username/i, /Email/i, /Password/i, /Confirm Password/i, /Sign Up/i].forEach(
    (elementLabel) => {
      const element = screen.getByText(elementLabel);
      expect(element).toBeInTheDocument();
    }
  );
});

test("Required fields Username, Email, Password and Confirm Password are empty", async () => {
  render(<SignUp />);
  [/Username/i, /Email/i, /Password/i, /Confirm Password/i].forEach(
    (elementLabel) => {
      const element = screen.getByRole("textbox", { name: elementLabel });
      userEvent.type(element, "");
    }
  );

  const submit = screen.getByText(/Sign Up/i);

  userEvent.click(submit);

  await waitFor(() => {
    expect(handleSubmit).toBeCalledTimes(1);
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test("Entered Email is not valid - without address sign", async () => {
  render(<SignUp />);

  handleSubmit({
    username: "test_user",
    email: "testmail.com",
    password: "test_password",
    confirm_password: "test_password",
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test("Entered Email is not valid - without coma after address sign", async () => {
  render(<SignUp />);

  handleSubmit({
    username: "test_user",
    email: "test@mailcom",
    password: "test_password",
    confirm_password: "test_password",
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test("Entered Password has length below 10", async () => {
  render(<SignUp />);

  handleSubmit({
    username: "test_user",
    email: "test@mail.com",
    password: "Abc45678#",
    confirm_password: "Abc45678#",
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test("Entered Password does not contain at least one uppercase letter", async () => {
  render(<SignUp />);

  handleSubmit({
    username: "test_user",
    email: "test@mail.com",
    password: "123456789#",
    confirm_password: "123456789#",
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test("Entered Password does not have a special character", async () => {
  render(<SignUp />);

  handleSubmit({
    username: "test_user",
    email: "test@mail.com",
    password: "123456789Test",
    confirm_password: "123456789Test",
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test("Entered Password does not match Confirm Password", async () => {
  render(<SignUp />);

  handleSubmit({
    username: "test_user",
    email: "test@mailcom",
    password: "test_passworD12!",
    confirm_password: "test_confirm_password",
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledTimes(0);
  });
});

test("Required fields are not empty, email is valid, password matches confirm password", async () => {
  render(<SignUp />);
  [/Username/i, /Email/i, /Password/i, /Confirm Password/i].forEach(
    (elementLabel) => {
      const element = screen.getByText(elementLabel);
      if (elementLabel.exec("username")![0]) {
        userEvent.type(element, "test_user");
      } else if (elementLabel.exec("email")![0]) {
        userEvent.type(element, "test@mail.com");
      } else {
        userEvent.type(element, "test_passworD12!");
      }
    }
  );

  const submit = screen.getByText(/Sign Up/i);

  userEvent.click(submit);

  await waitFor(() => {
    expect(handleSubmit).toBeCalledTimes(1);
  });

  await waitFor(() => {
    expect(onSubmit).toBeCalledWith({
      username: "test_user",
      email: "test@mail.com",
      password: "test_passworD12!",
      confirm_password: "test_passworD12!",
    });
  });
});

test("When form is validated user is taken to Validate Email page", () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  onSubmit({
    username: "test_user",
    email: "test@mail.com",
    password: "test_passworD12!",
    "confirm-password": "test_passworD12!",
  });

  expect(mockedNavigate).toBeCalledWith("/validate-email");
  mockedNavigate.mockRestore();
});
