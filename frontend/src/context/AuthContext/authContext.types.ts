export type AuthContextType = {
  userData?: UserData;
  isLoading: boolean;
  errorLoading?: AuthError;
};

export type AuthContextProps = AuthContextType & {
  registerUser: (userData: UserData) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
};

// Add here the common context's types. For example:

export type UserData = {
  _id: string;
  email: string;
  name: string;
  surname: string;
  idCompany?: string;
  roles: Role[];
  token: string;
};

export type Role = "USER" | "ADMIN" | "BOSS";

export type AuthError = {
  msg?: string;
  code?: string;
}

export type RespError = {
  type: string,
  msg: string,
  code: string;
}

export type RespAuth = {
  data: UserData;
  refreshToken: string;
  type: string;
}

export type AuthToken = {
  token: string;
  refreshToken: string;
}

export type ApiResp = {
  data?: UserData | RespError | any;
  status: number;
}