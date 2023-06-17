import React, { useState, ReactNode, useMemo } from "react";
import "./SimpleForm.scss";
import "./FormPage.scss";
import { ImageComponent } from "../../../global-components/ImageComponent";
import { ResizableExpiryDate } from "./ResizableExpiryDate";
import { FormInput } from "./FormInput";
import { IForm } from "./Interfaces";

interface Props {
  children: ReactNode;
}

export const SimpleForm: React.FC<Props> = () => {
  const [dataLoading, setDataLoading] = useState<number>(0);

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
    const { target } = event;
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

    if (name === "cardNumber") {
      const cleanedValue = value.replace(/[^0-9\s]/g, "");

      const blocks = [];
      let i = 0;

      while (i < cleanedValue.length) {
        blocks.push(cleanedValue.slice(i, i + 4));
        i += 4;
      }
console.log(blocks)
      const formattedValue = blocks.join(" ");
      setForm({
        ...form,
        [name]: { ...form[name], value: formattedValue, isValid, errorMessage },
      });
      target.value = formattedValue;
    }

    if (name === "expiryDate") {
      const cleanedValue = value.replace(/\//g, "");

      const blocks = [];
      let i = 0;

      while (i < cleanedValue.length) {
        blocks.push(cleanedValue.slice(i, i + 2));
        i += 2;
      }

      const formattedValue = blocks.join("/");
      target.value = formattedValue;

      /// Sprawdź, czy wartość ma poprawny format
      /// z obecną datą
      ///
      if (/^\d{2}\/\d{2}$/.test(value)) {
        const [month, year] = value.split("/");
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear() % 100;

        if (Number(month) >= 1 && Number(month) <= 12) {
          if (Number(year) >= currentYear && Number(year) <= currentYear + 5) {
            if(Number(month) >= currentMonth){
              setForm({
                ...form,
                [name]: { ...form[name], value, isValid, errorMessage },
              });
            }else {
              isValid = false;
              errorMessage = "Card has expired"
            }
          } else {
            isValid = false;
            errorMessage = "Card has expired";
          }
        } else {
          isValid = false;
          errorMessage = "Expiry date is incorrect";
        }
      } else {
        isValid = false;
        errorMessage = "Expiry date is incorrect";
      }

      /// Jeśli wartość jest niepoprawna, zaktualizuj stan komponentu z błędem
      ///
      setForm({
        ...form,
        [name]: { ...form[name], value: formattedValue, isValid, errorMessage },
      });
    } else {
      setForm({
        ...form,
        [name]: { ...form[name], value, isValid, errorMessage },
      });
    }
  };

  interface IBasicValidator {
    [key: string]: (value: string) => boolean | string;
  }

  const basicValidator: IBasicValidator = {
    fullName: (value) =>
      /([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,} )([A-Za-z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,})/.test(
        String(value)
      ) || "Full name is incorrect",

    cardNumber: (value) => {
      const cleanedValue = value.replace(/\D/g, "");

      if (!/^\d+$/.test(cleanedValue)) {
        return "Card number is incorrect";
      }

      if (cleanedValue.length < 13 || cleanedValue.length > 19) {
        return "Card number is incorrect";
      }

      /// Algorytm Luhna
      ///
      const digits = cleanedValue.replace(/\s/g, "").split("").reverse();
      let sum = 0;

      for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);

        if (i % 2 === 1) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }

        sum += digit;
      }

      if (sum % 10 !== 0) {
        return "Card number is incorrect";
      }
      return true;
    },

    expiryDate: (value) => {
      if (/^\d+$/.test(String(value))) {
        return "Expiry Date is incorrect";
      }
      return true;
    },

    CVV: (value) => {
      if(!/^\d+$/.test(String(value))){
        return "CVV number is incorrect"
      } else if (value.length !== 3) {
        return "CVV must have 3 numbers"
      }
      return true;
    },
  };

  // console.log(cardNumber)
  const handleLoader = () => {
    setDataLoading(1);
  };

  const srcImage = {
    desktopImage: "nx logo.png",
    tabletImage: "tab nx logo.png",
    mobileImage: "mob nx logo.png",
  };

  return (
    <div className="form-page">
      <div className="form-page__form-container">
        <div className="form-page__text">Add your informations</div>
        <form className="simple-form" onSubmit={handleSubmit}>
          <FormInput
            name="fullName"
            minLength={5}
            maxLength={25}
            label="Name on card"
            form={form}
            onBlur={handleFormChange}
          />
          <FormInput
            name="cardNumber"
            maxLength={19}
            label="Card number"
            form={form}
            onBlur={handleFormChange}
          />
          <div className="simple-form__flex-container">
            <ResizableExpiryDate
              className={`simple-form__input ${
                form.expiryDate.errorMessage && "error"
              }`}
              placeholder="Expiry date (MM/YY)"
              onBlur={handleFormChange}
            />
            <FormInput
              name="CVV"
              minLength={3}
              maxLength={3}
              label="CVV"
              form={form}
              onBlur={handleFormChange}
            />
          </div>
          <div className="flex-error-container">
            {form["expiryDate"].errorMessage && (
              <p className="simple-form__error-message">
                {form["expiryDate"].errorMessage}
              </p>
            )}
            {form["CVV"].errorMessage && (
              <p className="simple-form__error-message to-right">
                {form["CVV"].errorMessage}
              </p>
            )}
          </div>
          <button
            disabled={!isFormValid}
            data-loader={dataLoading}
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
        <ImageComponent src={srcImage} />
      </div>
    </div>
  );
};
