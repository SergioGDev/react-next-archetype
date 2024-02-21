import { DialogContextType, DialogData } from "./dialogContext.types";

type DialogAction =
  | { type: "openDialog"; payload: DialogData }
  | { type: "closeDialog" };

export const DialogContextReducer = (
  state: DialogContextType,
  action: DialogAction
): DialogContextType => {
  switch (action.type) {
    case "openDialog":
      return { dialogData: action.payload, showDialog: true };

    case "closeDialog":
      return { dialogData: undefined, showDialog: false };

    default:
      return state;
  }
};
