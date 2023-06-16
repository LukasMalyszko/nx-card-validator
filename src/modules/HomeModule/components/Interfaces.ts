export interface IForm {
    [key: string]: {
        value: string;
        isValid: boolean;
        errorMessage: string;
      };
}
