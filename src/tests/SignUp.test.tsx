import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SignUp } from "../common/components/SignUp";

const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigate,
}));

test("Sign Up page has Username, Email, Password and Confirm Password labels and Sign Up button", () => {
  render(<SignUp />);

  expect(getUsername()).toBeInTheDocument();
  expect(getEmail()).toBeInTheDocument();
  expect(getPassword()).toBeInTheDocument();
  expect(getConfirmPassword()).toBeInTheDocument();
  expect(getSignUp()).toBeInTheDocument();
});

test("Required fields Username, Email, Password and Confirm Password are empty", async () => {
  render(<SignUp />);
  userEvent.type(getUsername(), "");
  userEvent.type(getEmail(), "");
  userEvent.type(getPassword(), "");
  userEvent.type(getConfirmPassword(), "");

  userEvent.click(getSignUp());

  expect(await screen.findAllByRole("alert")).toHaveLength(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("Entered Email is not valid - without address sign", async () => {
  render(<SignUp />);

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "testmail.com");
  userEvent.type(getPassword(), "passworD12!");
  userEvent.type(getConfirmPassword(), "passworD12!");

  userEvent.click(getSignUp());

  expect(await screen.findAllByRole("alert")).toHaveLength(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("Entered Email is not valid - without coma after address sign", async () => {
  render(<SignUp />);

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "test@mailcom");
  userEvent.type(getPassword(), "passworD12!");
  userEvent.type(getConfirmPassword(), "passworD12!");

  userEvent.click(getSignUp());

  expect(await screen.findAllByRole("alert")).toHaveLength(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("Entered Password has length below 10", async () => {
  render(<SignUp />);

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "test@mail.com");
  userEvent.type(getPassword(), "Pass1!");
  userEvent.type(getConfirmPassword(), "Pass1!");

  userEvent.click(getSignUp());

  expect(await screen.findAllByRole("alert")).toHaveLength(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("Entered Password does not contain at least one uppercase letter", async () => {
  render(<SignUp />);

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "test@mail.com");
  userEvent.type(getPassword(), "password12!");
  userEvent.type(getConfirmPassword(), "password12!");

  userEvent.click(getSignUp());

  expect(await screen.findAllByRole("alert")).toHaveLength(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("Entered Password does not have a special character", async () => {
  render(<SignUp />);

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "test@mail.com");
  userEvent.type(getPassword(), "passworD123");
  userEvent.type(getConfirmPassword(), "passworD123");

  userEvent.click(getSignUp());

  expect(await screen.findAllByRole("alert")).toHaveLength(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("Entered Password does not match Confirm Password", async () => {
  render(<SignUp />);

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "test@mail.com");
  userEvent.type(getPassword(), "passworD123");
  userEvent.type(getConfirmPassword(), "passworD123_confirm");

  userEvent.click(getSignUp());

  expect(await screen.findAllByRole("alert")).toHaveLength(1);
  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("Required fields are not empty, email is valid, password matches confirm password", async () => {
  render(<SignUp />);

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "test@mail.com");
  userEvent.type(getPassword(), "passworD12!");
  userEvent.type(getConfirmPassword(), "passworD12!");

  userEvent.click(getSignUp());

  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledTimes(0));
  mockedNavigate.mockRestore();
});

test("When form is validated user is taken to Validate Email page", async () => {
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  );

  userEvent.type(getUsername(), "test_user");
  userEvent.type(getEmail(), "test@mail.com");
  userEvent.type(getPassword(), "passworD12!");
  userEvent.type(getConfirmPassword(), "passworD12!");

  userEvent.click(getSignUp());

  await waitFor(() =>
    expect(mockedNavigate).toHaveBeenCalledWith("/validate-email")
  );
  mockedNavigate.mockRestore();
});

const getUsername = () => screen.getByLabelText("Username");
const getEmail = () => screen.getByLabelText("Email");
const getPassword = () => screen.getByLabelText("Password");
const getConfirmPassword = () => screen.getByLabelText("Confirm Password");
const getSignUp = () => screen.getByLabelText("Sign Up");
