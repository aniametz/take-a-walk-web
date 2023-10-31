import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";
import SignUp from "../pages/sign-up";

jest.mock("../utils/functions", () => ({
  submitSignUpData: jest.fn(),
}));

jest.mock("next/router", () => {
  const router = {
    push: jest.fn(),
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

describe("SignUp", () => {
  it("Sign Up page has Username, Email, Password and Confirm Password labels and Sign Up button", () => {
    render(<SignUp />);

    expect(getUsername()).toBeInTheDocument();
    expect(getEmail()).toBeInTheDocument();
    expect(getPassword()).toBeInTheDocument();
    expect(getConfirmPassword()).toBeInTheDocument();
    expect(getSignUp()).toBeInTheDocument();
  });

  it("Required fields Username, Email, Password and Confirm Password are empty", async () => {
    render(<SignUp />);

    await userEvent.click(getUsername());
    await userEvent.click(getEmail());
    await userEvent.click(getPassword());
    await userEvent.click(getConfirmPassword());

    await userEvent.click(getSignUp());

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  it("Entered Email is not valid - without address sign", async () => {
    render(<SignUp />);

    await userEvent.type(getUsername(), "test_user");
    await userEvent.type(getEmail(), "testmail.com");
    await userEvent.type(getPassword(), "passworD12!");
    await userEvent.type(getConfirmPassword(), "passworD12!");

    await userEvent.click(getSignUp());

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  it("Entered Email is not valid - without coma after address sign", async () => {
    render(<SignUp />);

    await userEvent.type(getUsername(), "test_user");
    await userEvent.type(getEmail(), "test@mailcom");
    await userEvent.type(getPassword(), "passworD12!");
    await userEvent.type(getConfirmPassword(), "passworD12!");

    await userEvent.click(getSignUp());

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  it("Entered Password has length below 10", async () => {
    render(<SignUp />);

    await userEvent.type(getUsername(), "test_user");
    await userEvent.type(getEmail(), "test@mail.com");
    await userEvent.type(getPassword(), "Pass1!");
    await userEvent.type(getConfirmPassword(), "Pass1!");

    await userEvent.click(getSignUp());

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  it("Entered Password does not contain at least one uppercase letter", async () => {
    render(<SignUp />);

    await userEvent.type(getUsername(), "test_user");
    await userEvent.type(getEmail(), "test@mail.com");
    await userEvent.type(getPassword(), "password12!");
    await userEvent.type(getConfirmPassword(), "password12!");

    await userEvent.click(getSignUp());

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  it("Entered Password does not have a special character", async () => {
    render(<SignUp />);

    await userEvent.type(getUsername(), "test_user");
    await userEvent.type(getEmail(), "test@mail.com");
    await userEvent.type(getPassword(), "passworD123");
    await userEvent.type(getConfirmPassword(), "passworD123");

    await userEvent.click(getSignUp());

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  it("Entered Password does not match Confirm Password", async () => {
    render(<SignUp />);

    await userEvent.type(getUsername(), "test_user");
    await userEvent.type(getEmail(), "test@mail.com");
    await userEvent.type(getPassword(), "passworD12!");
    await userEvent.type(getConfirmPassword(), "passworD12!_confirm");

    await userEvent.click(getSignUp());

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
  });

  it("Required fields are not empty, email is valid, password matches confirm password, user is redirected to Validate Email page", async () => {
    render(<SignUp />);

    await userEvent.type(getUsername(), "test_user");
    await userEvent.type(getEmail(), "test@mail.com");
    await userEvent.type(getPassword(), "passworD12!");
    await userEvent.type(getConfirmPassword(), "passworD12!");

    await userEvent.click(getSignUp());

    let rolesChecked = false;
    try {
      rolesChecked = true;
      await screen.findAllByRole("alert");
    } catch {
      expect(rolesChecked).toBeTruthy();
    }

    expect(useRouter().push).toHaveBeenCalledTimes(1);
    expect(useRouter().push).toHaveBeenCalledWith("/validate-email");
  });

  const getUsername = () => screen.getByLabelText("Username");
  const getEmail = () => screen.getByLabelText("Email");
  const getPassword = () => screen.getByLabelText("Password");
  const getConfirmPassword = () => screen.getByLabelText("Confirm Password");
  const getSignUp = () => screen.getByLabelText("Sign Up");
});
