import React from "react";
import { IForm } from "./Interfaces";

interface FormInputProps {
  name: string;
  label: string;
  minLength?: number;
  maxLength?: number;
  form: IForm;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: any ) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  minLength,
  maxLength,
  form,
  onBlur,
  onChange,
  onKeyUp,
  onKeyDown,
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
        onBlur={onBlur}
        onChange={onChange}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
      />
      {showError && name !== "CVV" && (
        <p className="simple-form__error-message">{form[name].errorMessage}</p>
      )}
    </>
  );
};
