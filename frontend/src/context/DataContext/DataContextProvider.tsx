import React, {
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { DataContext } from "./DataContext";
import { Item } from "./dataContext.types";
import DataContextReducer from "./DataContextReducer";
import { initialDataContextState } from "./dataContext.consts";

export const DataContextProvider = ({ children }: PropsWithChildren) => {
  const [dataList, dispatch] = useReducer(
    DataContextReducer,
    initialDataContextState
  );
  const addItem = (item: Item) => dispatch({ type: "addItem", payload: item });
  const removeItem = (id: number) =>
    dispatch({ type: "removeItem", payload: id });

  return (
    <DataContext.Provider value={{ ...dataList, addItem, removeItem }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
