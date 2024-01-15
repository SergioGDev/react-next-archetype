import React, {
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";

import { SidebarContextReducer } from "./SidebarContextReducer";
import { SidebarContext } from "./SidebarContext";
import { initialSidebarContextState } from "./sidebarContext.consts";
import { SidebarContextProps } from "./sidebarContext.types";

export const SidebarContextProvider = ({ children }: PropsWithChildren) => {
  const [sidebarData, dispatch] = useReducer(
    SidebarContextReducer,
    initialSidebarContextState
  );

  const setSidebarOpened = (sidebarState: boolean) => dispatch({ type: 'setSidebarState', payload: sidebarState });

  const providerObject: SidebarContextProps = {
    ...sidebarData,

    // Add here the methods of the provider
    setSidebarOpened,    
  };

  return (
    <SidebarContext.Provider value={providerObject}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
