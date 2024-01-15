import { createContext } from 'react';
import { SidebarContextProps } from './sidebarContext.types'

export const SidebarContext = createContext<SidebarContextProps>({} as SidebarContextProps);