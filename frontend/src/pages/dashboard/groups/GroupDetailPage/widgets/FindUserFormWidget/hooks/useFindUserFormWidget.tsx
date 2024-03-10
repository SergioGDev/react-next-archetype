import { USER_ROLE } from "@/consts/pattern.consts";
import { AUTH_TOKEN } from "@/context/AuthContext/authContext.consts";
import { UserData } from "@/context/AuthContext/authContext.types";
import { useDialogContext } from "@/context/DialogContext/DialogContextProvider";
import { useSnackbarContext } from "@/context/SnackbarContext/SnackbarContextProvider";
import { FindUserFormWidgetProps } from "../findUserFormWidget.types";
import { useGroupDetailContext } from "../../../context/GroupDetailContext/GroupDetailContextProvider";

import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { RespData } from "@/types/axios.types";

export const useFindUserFormWidget = () => {
  const { showSnackbar } = useSnackbarContext();
  const { openDialog } = useDialogContext();
  const { groupData, setGroupData, setLoadingFindUsers } =
    useGroupDetailContext();
  const { id } = useParams<{ id: string }>()!;

  const methods = useForm<{ userEmail: string }>();
  const { watch } = methods;

  const handleOnSubmit = () => {
    const { userEmail } = watch();
    submitAddUserToGroup(userEmail);
  };

  const submitAddUserToGroup = async (email: string) => {
    const authToken = Cookies.get(AUTH_TOKEN);

    setLoadingFindUsers(true);
    const resp = await axios.get(
      `/api/auth/user-list?email=${email}&role=${USER_ROLE}&hardCompare=true`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (resp) {
      const { userList, length } = resp.data;
      console.log(userList);
      if (length !== 1) {
        showSnackbar("This user isn't exist");
        setLoadingFindUsers(false);
        return;
      }

      // Compare the idGroup of the user with the idGroup
      if (id === (userList[0] as UserData).idGroup) {
        showSnackbar("This user already belongs to this group");
        setLoadingFindUsers(false);
        return;
      }

      setLoadingFindUsers(false);
      // We only have an account
      const userData: UserData = userList[0];
      openDialog({
        title: "Add user to group",
        contentText: `Do you want to add the user ${userData.name} ${userData.surname} to this group?`,
        type: "ACCEPT_CANCEL_DIALOG",
        actionConfirm: () => {
          setLoadingFindUsers(true);
          axios
            .post(
              "/api/auth/update-user-data",
              {
                email: userData.email,
                idGroup: id,
              },
              {
                headers: { Authorization: `Bearer ${authToken}` },
              }
            )
            .then((resp) => {
              const { userData } = resp.data;
              console.log(resp);
              setGroupData({
                ...groupData!,
                userList: [...groupData!.userList ?? [], userData],
              });
              showSnackbar("User added to group");

              setLoadingFindUsers(false);
            })
            .catch(() => {
              showSnackbar("Error getting data");
              setLoadingFindUsers(false);
            });
        },
      });
    } else {
      showSnackbar("Error getting data");
      setLoadingFindUsers(false);
    }
  };

  return { submitAddUserToGroup, handleOnSubmit, methods };
};
