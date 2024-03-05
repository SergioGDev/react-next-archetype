"use client";
import React, {
  Fragment,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

import { SnackbarContextReducer } from "./SnackbarContextReducer";
import { SnackbarContext } from "./SnackbarContext";
import { initialSnackbarContextState } from "./snackbarContext.consts";
import { SnackbarContextProps } from "./snackbarContext.types";
import { Button, Snackbar } from "@mui/material";

export const SnackbarContextProvider = ({ children }: PropsWithChildren) => {
  const [snackbarData, dispatch] = useReducer(
    SnackbarContextReducer,
    initialSnackbarContextState
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "closeSnackbar" });
  };

  const showSnackbar = (msg: string) => {
    dispatch({ type: "showSnackbar", payload: msg });
  };

  const providerObject: SnackbarContextProps = {
    ...snackbarData,
    showSnackbar,
  };

  return (
    <SnackbarContext.Provider value={providerObject}>
      {children}
      <Fragment>
        <Snackbar
          open={snackbarData.open}
          message={snackbarData.snackbarMessage}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
          action={
            <Button color="primary" size="small" onClick={handleClose}>
              CLOSE
            </Button>
          }
        />
      </Fragment>
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => useContext(SnackbarContext);
