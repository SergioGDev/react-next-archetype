import { PropsWithChildren, useReducer } from "react";

import AuthContext from "./AuthContext";
import AuthContextReducer from "./AuthContextReducer";
import { initialAuthContextState } from "./authContext.consts";
import {
  ApiResp,
  RespError,
  UserData,
  RespAuth,
  AuthToken,
  AuthContextProps,
} from "./authContext.types";

import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [authContextData, dispatch] = useReducer(
    AuthContextReducer,
    initialAuthContextState
  );

  const login = (email: string, password: string) => {
    dispatch({ type: "startLogin" });

    // Implement login authentication with axios
    axios
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((resp: ApiResp) => {
        readApiResp(resp);
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch({
          type: "errorLoging",
          payload: { msg: response.data.msg, code: response.status },
        });
      });
  };

  const registerUser = (userData: UserData) => {
    dispatch({ type: "startRegisterUser" });

    axios.post("/api/auth/register", { ...userData }).then((resp: ApiResp) => {
      readApiResp(resp);
    });
  };

  const readApiResp = (resp: ApiResp) => {
    if (resp.status !== 200) {
      const { msg, code } = resp.data as RespError;
      dispatch({ type: "errorLoging", payload: { msg, code } });
      throw new Error("Error");
    }

    const { user, token } = resp.data as RespAuth;
    const authToken: AuthToken = {
      token,
    };
    Cookies.set("authTokens", JSON.stringify(authToken));dispatch({ type: "okLogin", payload: user });
    router.push("/dashboard/home");
  }

  const logout = () => {
    Cookies.remove("authTokens");
    dispatch({ type: "logout" });
    router.replace("/login");
  };

  const providerValues: AuthContextProps = {
    ...authContextData,
    login,
    logout,
    registerUser,
  };

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};
