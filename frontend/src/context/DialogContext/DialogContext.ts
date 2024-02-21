import { createContext } from 'react';
import { DialogContextProps } from './dialogContext.types'

export const DialogContext = createContext<DialogContextProps>({} as DialogContextProps);