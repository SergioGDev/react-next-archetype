import { AuthContextType } from "./authContext.types";

export const initialAuthContextState: AuthContextType = {
  isLoading: false,
};

export const AUTH_TOKEN = 'authToken';
export const USER_DATA = 'userData';