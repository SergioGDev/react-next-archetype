import { AUTH_TOKEN } from "@/context/AuthContext/authContext.consts";
import { useAuthContext } from "@/context/AuthContext";
import { useDialogContext } from "@/context/DialogContext/DialogContextProvider";
import { useSnackbarContext } from "@/context/SnackbarContext/SnackbarContextProvider";
import { useGetData } from "@/hooks/useGetData";
import { UserData } from "@/context/AuthContext/authContext.types";
import { GroupData } from "@/types/group.types";
import axios from "axios";
import Cookies from "js-cookie";

export const useMyGroupData = () => {
  const authToken = Cookies.get(AUTH_TOKEN);
  const { userData, setUserData } = useAuthContext();
  const { showSnackbar } = useSnackbarContext();
  const { openDialog } = useDialogContext();

  const { data, isLoading } = useGetData<GroupData>(
    userData?.idGroup ? `/api/group/groups/${userData.idGroup}` : ""
  );

  const onClickLeaveGroup = () => {
    openDialog({
      title: "Leave group",
      contentText: `Do you want to leave the group ${data?.name}?`,
      type: "ACCEPT_CANCEL_DIALOG",
      actionConfirm: leaveGroup,
    });
  };

  const leaveGroup = () => {
    axios
      .post(
        '/api/auth/update-user-data',
        { email: userData?.email, idGroup: null },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((resp) => {
        const { userData } = resp.data;
        setUserData(userData as UserData);
        showSnackbar("You have leaved the group");
      });
  };

  return { data, isLoading, userData, onClickLeaveGroup };
};
