import { UserData } from "@/context/AuthContext/authContext.types";

export type GroupData = {
  id?: string;
  name: string;
  description: string;
  creatorId: string;
  creationDate?: Date;
  userList?: UserData[];
  status?: string;
}

export type GroupListPageApiRespData = {
  groups: GroupData[];
}