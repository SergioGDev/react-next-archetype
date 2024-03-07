import { PropsWithChildren, useContext, useEffect, useReducer } from "react";

import AuthContext from "./AuthContext";
import AuthContextReducer from "./AuthContextReducer";
import {
  AUTH_TOKEN,
  USER_DATA,
  initialAuthContextState,
} from "./authContext.consts";
import {
  ApiResp,
  UserData,
  RespAuth,
  AuthContextProps,
} from "./authContext.types";

import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { RespError } from "@/types/axios.types";

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [authContextData, dispatch] = useReducer(
    AuthContextReducer,
    initialAuthContextState
  );

  useEffect(() => {
    // If we have a cookie and we don't have info of a user
    getUserDataFromCookie();
  }, []);

  const getUserDataFromCookie = () => {
    if (Cookies.get(USER_DATA) && !authContextData.userData) {
      const userData = JSON.parse(Cookies.get(USER_DATA)!);
      dispatch({ type: "setUserDataFromCookie", payload: userData });
    } else {
      logout();
    }
  };

  const renewToken = () => {
    axios
      .post("/api/auth/renew-token", {
        token: Cookies.get(AUTH_TOKEN),
      })
      .then((resp: ApiResp) => {
        if (resp.status !== 200) {
          const { msg, code } = resp.data as RespError;
          dispatch({ type: "errorLoging", payload: { msg, code } });
          console.log("Unexpected error");
        }

        const { user, token } = resp.data as RespAuth;
        Cookies.set(AUTH_TOKEN, token);
        dispatch({ type: "okLogin", payload: user });
        Cookies.set(USER_DATA, JSON.stringify(user));
      });
  };

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
          payload: { msg: response.data.error, code: response.status },
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
      console.log("Unexpected error");
    }

    const { user, token } = resp.data as RespAuth;
    Cookies.set(AUTH_TOKEN, token);
    dispatch({ type: "okLogin", payload: user });
    Cookies.set(USER_DATA, JSON.stringify(user));
    router.push("/dashboard/home");
  };

  const logout = () => {
    Cookies.remove(AUTH_TOKEN);
    localStorage.removeItem(USER_DATA);
    dispatch({ type: "logout" });
    router.replace("/login");
  };

  const setUserData = (userData: UserData) => {
    console.log(userData);
    Cookies.set(USER_DATA, JSON.stringify(userData));
    dispatch({ type: "setUserData", payload: userData });
  };

  const providerValues: AuthContextProps = {
    ...authContextData,
    login,
    logout,
    registerUser,
    renewToken,
    setUserData,
  };

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
