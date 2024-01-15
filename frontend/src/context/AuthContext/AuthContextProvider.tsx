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
        console.log(resp);
        if (resp.status !== 200) {
          const { msg, code } = resp.data as RespError;
          dispatch({ type: "errorLoging", payload: { msg, code } });
          throw new Error("Error");
        }

        const { user, token } = resp.data as RespAuth;
        const authToken: AuthToken = {
          token: token
        };
        Cookies.set("authTokens", JSON.stringify(authToken));

        dispatch({ type: "okLogin", payload: user });
        router.push("/dashboard/home");
      })
      .catch(({ response }) => {
        console.log(response);
        dispatch({
          type: "errorLoging",
          payload: { msg: response.data.msg, code: response.status },
        });
      });
  };

  const logout = () => {
    Cookies.remove("authTokens");
    dispatch({ type: "logout" });
    router.replace("/login");
  };

  const registerUser = (userData: UserData) => {
    console.log("register user:", userData);
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
