import { SetStateAction } from "react";
import { UserData } from "@/context/AuthContext/authContext.types";

export type FindUserFormWidgetProps = {
  setUserListData: (value: SetStateAction<UserData[]>) => void;
};
