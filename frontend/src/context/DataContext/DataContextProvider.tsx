import React, {
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

import { DataContextReducer } from "./DataContextReducer";
import { DataContext } from "./DataContext";
import { DataContextProps, Item } from "./dataContext.types";
import { initialDataContextState } from "./dataContext.consts";

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [dataList, dispatch] = useReducer(
    DataContextReducer,
    initialDataContextState
  );
  const addItem = (item: Item) => dispatch({ type: "addItem", payload: item });
  const removeItem = (id: number) =>
    dispatch({ type: "removeItem", payload: id });

  const obj: DataContextProps = { ...dataList, addItem, removeItem };

  return (
    <DataContext.Provider value={obj}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
