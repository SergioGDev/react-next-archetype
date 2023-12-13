import { createContext } from 'react';
import { AuthContextProps } from './authContext.types';

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default AuthContext;