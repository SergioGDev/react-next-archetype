import { createContext } from 'react';
import { DataContextProps } from './dataContext.types';

export const DataContext = createContext<DataContextProps>({} as DataContextProps);