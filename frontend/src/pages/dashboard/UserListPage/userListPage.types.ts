import { GeneralTableCellType } from "@/components/common/GeneralTable/generalTable.types";
import { UserData } from "@/context/AuthContext/authContext.types";
import { RespError } from "@/types/axios.types";

export type UserListPageApiResp = {
  data?: UserListPageApiRespData | RespError | any;
  status: number;
};

export type UserListPageApiRespData = {
  length: number;
  userList: UserData[];
};
