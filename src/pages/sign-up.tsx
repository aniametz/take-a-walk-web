import { joiResolver } from "@hookform/resolvers/joi";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../components/Input";
import { submitSignUpData } from "../utils/functions";
import { IFormInput } from "../utils/interfaces";
import { schema, schemaOptions } from "../utils/schemas";

import { useRouter } from "next/router";

function SignUp(): JSX.Element {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: joiResolver(schema, schemaOptions),
  });
  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    submitSignUpData(data);
    router.push("/validate-email");
  };

  return (
    <div className="common-container">
      <div className="m-auto w-4/12">
        <p className="common-header">Sign Up</p>
        <div className="form-container">
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
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

export default SignUp;
