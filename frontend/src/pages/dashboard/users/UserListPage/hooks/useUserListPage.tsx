import {
  UserListPageApiRespData,
} from "../userListPage.types";
import { useGetData } from "@/hooks/useGetData";

export const useUserListPage = () => {
  const { data, isLoading } = useGetData<UserListPageApiRespData>(
    "/api/auth/user-list"
  );

  return { data, isLoading };
};
