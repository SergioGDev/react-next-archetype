import React, { PropsWithChildren, useContext, useReducer } from "react";

import { DialogContextReducer } from "./DialogContextReducer";
import { DialogContext } from "./DialogContext";
import { initialDialogContextState } from "./dialogContext.consts";
import { DialogContextProps, DialogData } from "./dialogContext.types";

export const DialogContextProvider = ({ children }: PropsWithChildren) => {
  const [dialogData, dispatch] = useReducer(
    DialogContextReducer,
    initialDialogContextState
  );

  const openDialog = (dialogData: DialogData) =>
    dispatch({ type: "openDialog", payload: dialogData });

  const closeDialog = () => dispatch({ type: "closeDialog" });

  const providerObject: DialogContextProps = {
    ...dialogData,

    // Add here the methods of the provider
    openDialog,
    closeDialog,
  };

  return (
    <DialogContext.Provider value={providerObject}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => useContext(DialogContext);
