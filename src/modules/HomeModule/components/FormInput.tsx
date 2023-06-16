import React from "react";
import { IForm } from "./Interfaces";

interface FormInputProps {
  name: string;
  label: string;
  minLength?: number;
  maxLength?: number;
  form: IForm;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  minLength,
  maxLength,
  form,
  onChange,
}) => {
  const showError = form[name].errorMessage;

  return (
    <>
      <input
        className={`simple-form__input ${showError && "error"}`}
        name={name}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={label}
        required
        type="text"
        onChange={onChange}
      />
        {showError && name !== "CVV" && (
        <p className="simple-form__error-message">{form[name].errorMessage}</p>
        )}
    </>
  );
};
