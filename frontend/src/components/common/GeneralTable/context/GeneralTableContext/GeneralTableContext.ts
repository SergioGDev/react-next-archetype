import { createContext } from "react";
import { GeneralTableContextProps } from "./generalTableContext.types";

const createGenericContext = <T extends Object>() => {
  return createContext<GeneralTableContextProps<T>>(
    {} as GeneralTableContextProps<T>
  );
};

export const GeneralTableContext = createGenericContext<any>();
