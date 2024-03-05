import { RespError } from "@/types/axios.types";

export type AuthContextType = {
  userData?: UserData;
  isLoading: boolean;
  errorLoading?: AuthError;
};

export type AuthContextProps = AuthContextType & {
  registerUser: (userData: UserData) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  renewToken: () => void;
  setUserData: (userData: UserData) => void;
};

// Add here the common context's types. For example:

export type UserData = {
  id?: string;
  email: string;
  name: string;
  password?: string;
  surname: string;
  role: Role;
  idGroup?: string;
  creationDate?: Date;
  status?: string;
};

export type Role = "USER_ROLE" | "ADMIN_ROLE" | "COORDINATOR_ROLE";

export type AuthError = {
  msg?: string;
  code?: string;
}

export type RespAuth = {
  user: UserData;
  token: string;
}

export type AuthToken = {
  token: string;
}

export type ApiResp = {
  data?: UserData | RespError | any;
  status: number;
}