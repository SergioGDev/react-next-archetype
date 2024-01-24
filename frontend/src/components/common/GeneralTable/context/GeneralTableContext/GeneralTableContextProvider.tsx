import React, { PropsWithChildren, useContext, useReducer } from "react";

import { GeneralTableContextReducer } from "./GeneralTableContextReducer";
import { GeneralTableContext } from "./GeneralTableContext";
import { GeneralTableHeaderData, Order } from "../../generalTable.types";
import { GeneralTableContextProps } from "./generalTableContext.types";
import { createInitialGeneralTableContextState } from "./generalTableContext.helpers";

export const GeneralTableContextProvider = <T extends Object>({
  children,
}: PropsWithChildren) => {
  const initialGeneralTableContextState =
    createInitialGeneralTableContextState<T>([], [], "asc");

  const [generalTableContextData, dispatch] = useReducer(
    GeneralTableContextReducer,
    initialGeneralTableContextState
  );

  const setInitValues = (
    headers: GeneralTableHeaderData[],
    rows: T[],
    order: Order = "asc"
  ) => dispatch({ type: "setInitValues", payload: { headers, rows, order } });

  const providerObject: GeneralTableContextProps<T> = {
    ...(generalTableContextData as GeneralTableContextProps<T>),

    // Add here the methods of the provider
    setInitValues,
  };

  return (
    <GeneralTableContext.Provider value={providerObject}>
      {children}
    </GeneralTableContext.Provider>
  );
};

export const useGeneralTableContext = () => useContext(GeneralTableContext);
