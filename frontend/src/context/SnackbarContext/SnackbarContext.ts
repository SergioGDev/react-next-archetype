import { createContext } from 'react';
import { SnackbarContextProps } from './snackbarContext.types'

export const SnackbarContext = createContext<SnackbarContextProps>({} as SnackbarContextProps);