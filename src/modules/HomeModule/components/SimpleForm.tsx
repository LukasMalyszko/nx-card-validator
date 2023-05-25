import React, { useState, ReactNode, useMemo } from "react";
import { ImageComponent } from "./ImageComponent";
import "./SimpleForm.scss";

interface IForm {
  [key: string]: {
    value: string;
    isValid: boolean;
    errorMessage: string;
  };
}

interface Props {
  children: ReactNode;
}

export const SimpleForm: React.FC<Props> = () => {
  const [form, setForm] = useState<IForm>({
    fullName: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    cardNumber: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    expiryDate: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
    CVV: {
      value: "",
      isValid: false,
      errorMessage: "",
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid) {
      console.log(form);
    }
  };

  const isFormValid = useMemo(
    () => Object.values(form).every(({ isValid }) => isValid),
    [form]
  );

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const validator = basicValidator[name];
    let isValid = true;
    let errorMessage = "";

    if (validator) {
      const validatorValue = validator(value);

      if (typeof validatorValue === "string") {
        isValid = !validatorValue;
        errorMessage = validatorValue;
      }
    }
    setForm({
      ...form,
      [name]: { ...form[name], value, isValid, errorMessage },
    });
  };

  interface IBasicValidator {
    [key: string]: (value: string) => boolean | string;
  }

  const basicValidator: IBasicValidator = {
    fullName: (value: string) =>
      /([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,} )([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,})/.test(
        String(value)
      ) || "Full name is incorrect",
    cardNumber: (value: string) =>
      /([/^\d+$/])/.test(String(value)) || "Card number is incorrect",
    expiryDate: (value: string) =>
      /([/^\d{2}/\d{4}$/])/.test(String(value)) || "Expiry Date is incorrect",
    CVV: (value: string) =>
      /([/^\d+$/])/.test(String(value)) || "CVV number is incorrect",
  };

  const handleLoader = () => {
    const button = document.querySelector(".simple-form__button");
    button?.setAttribute("data-loader", "1");
  };

  return (
    <div className="form-page">
      <div className="form-page__form-container">
        <div className="form-page__text">Add your informations</div>
        <form className="simple-form" onSubmit={handleSubmit}>
          <input
            className="simple-form__input"
            name="fullName"
            minLength={5}
            maxLength={25}
            placeholder="Name on card"
            required
            type="text"
            onChange={handleFormChange}
          />
          {form["fullName"].errorMessage && (
            <p className="simple-form__error-message">
              {form["fullName"].errorMessage}
            </p>
          )}
          <input
            className="simple-form__input"
            name="cardNumber"
            minLength={16}
            maxLength={16}
            placeholder="Card number"
            required
            type="text"
            onChange={handleFormChange}
          />
          {form["cardNumber"].errorMessage && (
            <p className="simple-form__error-message">
              {form["cardNumber"].errorMessage}
            </p>
          )}
          <div className="simple-form__flex-container">
            <input
              className="simple-form__input"
              type="text"
              name="expiryDate"
              minLength={4}
              maxLength={4}
              required
              placeholder="Expiry date (MM/YY)"
              onChange={handleFormChange}
            />
            
            <input
              className="simple-form__input"
              type="text"
              name="CVV"
              minLength={3}
              maxLength={3}
              required
              placeholder="CVV"
              onChange={handleFormChange}
            />
            
          </div>
          {form["expiryDate"].errorMessage && (
              <p className="simple-form__error-message">
                {form["expiryDate"].errorMessage}
              </p>
            )}
            {form["CVV"].errorMessage && (
              <p className="simple-form__error-message">
                {form["CVV"].errorMessage}
              </p>
            )}
          <button
            disabled={!isFormValid}
            data-loader="0"
            className="simple-form__button"
            type="submit"
            onClick={handleLoader}
          >
            <div className="text">Next step</div>
            <div className="loader">
              <img src="/animated-loader.svg" alt="" />
            </div>
          </button>
        </form>
      </div>
      <div className="form-page__img-container">
        <ImageComponent />
      </div>
    </div>
  );
};
