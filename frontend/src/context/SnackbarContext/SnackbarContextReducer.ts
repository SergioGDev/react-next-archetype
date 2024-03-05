import { SnackbarContextType } from "./snackbarContext.types";

type SnackbarAction =
  | { type: "showSnackbar"; payload: string }
  | { type: "closeSnackbar" };

export const SnackbarContextReducer = (
  state: SnackbarContextType,
  action: SnackbarAction
): SnackbarContextType => {
  switch (action.type) {
    case "showSnackbar":
      return { open: true, snackbarMessage: action.payload };

    case "closeSnackbar":
      return { open: false, snackbarMessage: "" };

    default:
      return state;
  }
};
