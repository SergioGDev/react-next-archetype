import { AuthContextType, AuthError, UserData } from "./authContext.types";

type AuthAction =
  | { type: "startLogin" }
  | { type: "setUserDataFromCookie"; payload: UserData }
  | { type: "okLogin"; payload: UserData }
  | { type: "errorLoging"; payload: AuthError }
  | { type: "startRegisterUser" }
  | { type: "logout" }
  | { type: "setUserData"; payload: UserData };

const AuthContextReducer = (
  state: AuthContextType,
  action: AuthAction
): AuthContextType => {
  switch (action.type) {
    case "startLogin":
      return { isLoading: true, errorLoading: undefined, userData: undefined };

    case "setUserDataFromCookie":
      return { ...state, userData: action.payload };

    case "okLogin":
      return {
        isLoading: false,
        userData: action.payload,
        errorLoading: undefined,
      };

    case "errorLoging":
      return {
        userData: undefined,
        errorLoading: action.payload,
        isLoading: false,
      };

    case "startRegisterUser":
      return {
        isLoading: true,
        errorLoading: undefined,
        userData: undefined,
      };

    case "logout":
      return { userData: undefined, errorLoading: undefined, isLoading: false };

    case "setUserData":
      return {
        userData: action.payload,
        errorLoading: undefined,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default AuthContextReducer;
