import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { IFormInput } from "../interfaces";

interface InputProps {
  label: Path<IFormInput>;
  type: string;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
}

export function Input(props: InputProps): JSX.Element {
  const { label, type, register, errors } = props;
  return (
    <div>
      <label>{label}</label>
      <input type={type} aria-label={label} {...register(label)} />
      {errors[label] && <span role="alert">{errors[label]?.message}</span>}
    </div>
  );
}
