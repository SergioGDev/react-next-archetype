import { createContext } from 'react';
import { GroupDetailContextProps } from './groupDetailContext.types'

export const GroupDetailContext = createContext<GroupDetailContextProps>({} as GroupDetailContextProps);