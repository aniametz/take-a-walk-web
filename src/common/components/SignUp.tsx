import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { submitSignUpData } from "../functions";
import { IFormInput } from "../interfaces";
import { schema, schemaOptions } from "../schemas";
import { Input } from "./Input";

export function SignUp(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema, schemaOptions),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    submitSignUpData(data);
    navigate("/validate-email");
  };

  return (
    <div className="common-container">
      <div className="m-auto w-4/12">
        <p className="common-header">Sign Up</p>
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Username"
              type="text"
              register={register}
              errors={errors}
            />
            <Input
              label="Email"
              type="email"
              register={register}
              errors={errors}
            />
            <Input
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <Input
              label="Confirm Password"
              type="password"
              register={register}
              errors={errors}
            />
            <input
              type="submit"
              aria-label="Sign Up"
              value={"Sign Up"}
              className="submit-btn"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
