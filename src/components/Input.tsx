import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { IFormInput } from "../utils/interfaces";

interface InputProps {
  label: Path<IFormInput>;
  type: string;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

function Input(props: InputProps): JSX.Element {
  const { label, type, register, errors } = props;

  // console.log({ errors });
  return (
    <div className="form-input-container">
      <label className="form-label">{label}</label>
      <input
        type={type}
        aria-label={label}
        {...register(label)}
        className="form-input"
      />
      <div className="empty-alert">
        {errors[label] ? (
          <p role="alert" className="form-alert">
            {errors[label]?.message}
          </p>
        ) : (
          "."
        )}
      </div>
    </div>
  );
}

export default Input;
