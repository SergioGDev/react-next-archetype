import { AuthContextType, AuthError, UserData } from "./authContext.types";

type AuthAction =
  | { type: "startLogin" }
  | { type: "okLogin"; payload: UserData }
  | { type: "errorLoging"; payload: AuthError }
  | { type: "logout" };

const AuthContextReducer = (
  state: AuthContextType,
  action: AuthAction
): AuthContextType => {
  switch (action.type) {
    case "startLogin":
      return { isLoading: true, errorLoading: undefined, userData: undefined };

    case "okLogin":
      return {
        isLoading: false,
        userData: action.payload,
        errorLoading: undefined,
      };

    case "logout":
      return { userData: undefined, errorLoading: undefined, isLoading: false };

    case "errorLoging":
      return {
        userData: undefined,
        errorLoading: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default AuthContextReducer;
