import React, { PropsWithChildren, useContext, useReducer } from "react";

import { GeneralTableContextReducer } from "./GeneralTableContextReducer";
import { GeneralTableContext } from "./GeneralTableContext";
import { Order } from "../../generalTable.types";
import { initialGeneralTableContextState } from "./generalTableContext.consts";
import {
  GeneralTableContextProps,
  GeneralTableContextType,
} from "./generalTableContext.types";

export const GeneralTableContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [generalTableContextData, dispatch] = useReducer(
    GeneralTableContextReducer,
    initialGeneralTableContextState
  );

  const setInitValues = (initValues: GeneralTableContextType) => {
    dispatch({ type: "setInitValues", payload: initValues });
  };

  const setPage = (page: number) => {
    dispatch({ type: "setPage", payload: page });
  };

  const setOrder = (order: Order) => {
    dispatch({ type: "setOrder", payload: order });
  };

  const setOrderBy = (orderBy: string) => {
    dispatch({ type: "setOrderBy", payload: orderBy });
  };

  const setRowsPerPage = (rowsPerPage: number) => {
    dispatch({ type: "setRowsPerPage", payload: rowsPerPage });
  };

  const providerObject: GeneralTableContextProps = {
    ...generalTableContextData,

    // Add here the methods of the provider
    setInitValues,
    setPage,
    setOrder,
    setOrderBy,
    setRowsPerPage,
  };

  return (
    <GeneralTableContext.Provider value={providerObject}>
      {children}
    </GeneralTableContext.Provider>
  );
};

export const useGeneralTableContext = () => useContext(GeneralTableContext);
