import React, {
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

import { {{pascalCase name}}ContextReducer } from "./{{pascalCase name}}ContextReducer";
import { {{pascalCase name}}Context } from "./{{pascalCase name}}Context";
import { initial{{pascalCase name}}ContextState } from "./{{camelCase name}}Context.consts";
import { {{ pascalCase name }}ContextProps } from "./{{camelCase name}}Context.types";

export const {{pascalCase name}}ContextProvider = ({ children }: PropsWithChildren) => {
  const [{{camelCase name}}Data, dispatch] = useReducer(
    {{pascalCase name}}ContextReducer,
    initial{{pascalCase name}}ContextState
  );

  // const addItem = (item: Item) => dispatch({ type: "addItem", payload: item });
  // const removeItem = (id: number) => dispatch({ type: "removeItem", payload: id });

  const providerObject: {{ pascalCase name }}ContextProps = {
    ...{{camelCase name}}Data,

      // Add here the methods of the provider
      // addItem,
      // removeItem,
  };

  return (
    <{{pascalCase name}}Context.Provider value={providerObject}>
      {children}
    </{{pascalCase name}}Context.Provider>
  );
};

export const use{{pascalCase name}}Context = () => useContext({{pascalCase name}}Context);
