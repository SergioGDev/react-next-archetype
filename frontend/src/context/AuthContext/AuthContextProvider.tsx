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
} from "./authContext.types";

import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [userData, dispatch] = useReducer(
    AuthContextReducer,
    initialAuthContextState
  );

  const login = (email: string, password: string) => {
    dispatch({ type: "startLogin" });

    // Implement login authentication with axios
    axios
      .post("/api/login", {
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

        const { data, refreshToken } = resp.data as RespAuth;
        const authToken: AuthToken = {
          token: data.token,
          refreshToken,
        };
        Cookies.set("authTokens", JSON.stringify(authToken));
        dispatch({ type: "okLogin", payload: data });
        router.push("/admin/dashboard");
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

  const providerValues = {
    ...userData,
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
