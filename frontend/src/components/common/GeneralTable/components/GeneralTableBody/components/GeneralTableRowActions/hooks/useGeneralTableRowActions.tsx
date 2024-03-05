import { GeneralTableAction } from "@/components/common/GeneralTable/generalTable.types";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import axios from "axios";
import Cookies from "js-cookie";
import { useDialogContext } from "@/context/DialogContext/DialogContextProvider";
import { DialogData } from "@/context/DialogContext";
import { AUTH_TOKEN } from "@/context/AuthContext/authContext.consts";
import { useSnackbarContext } from "@/context/SnackbarContext/SnackbarContextProvider";
import { UserData } from "@/context/AuthContext/authContext.types";

export const useGeneralTableRowActions = () => {
  const { userData, renewToken, setUserData } = useAuthContext();
  const { openDialog } = useDialogContext();
  const { showSnackbar } = useSnackbarContext();
  const authToken = Cookies.get(AUTH_TOKEN);
  const router = useRouter();

  const onClickGeneralTableAction = (
    actionType: GeneralTableAction,
    actionData?: { [key: string]: any },
    body?: { [key: string]: any }
  ) => {
    if (actionData && body) {
      switch (actionType) {
        case "GO_TO_PAGE_ACTION":
          goToPageAction(actionData, body);
          return;

        case "POST_WITHOUT_ID_ROW_ACTION":
          postWithoutIdRowAction(actionData);
          return;

        case "ADD_USER_TO_GROUP_ACTION":
          addUserToGroupAction(actionData, body);
          return;
      }
    }
  };

  // Go to page action
  const goToPageAction = (
    actionData: { [key: string]: any },
    body: { [key: string]: any }
  ) => {
    const { path } = actionData;
    const { id } = body;

    router.push((path as string).replace(":id", id));
  };

  // Post action
  const postWithoutIdRowAction = (actionData: { [key: string]: any }) => {
    const { url, body, dialogData } = actionData;

    const dialogOpenedData: DialogData = {
      title: dialogData.title,
      contentText: dialogData.contextText,
      type: "ACCEPT_CANCEL_DIALOG",
      actionConfirm: () => {
        axios
          .post(url, body, {
            headers: {
              Authorization: authToken ? `Bearer ${authToken}` : "",
            },
          })
          .then((resp) => console.log(resp))
          .catch((error) => console.log(error));
      },
    };

    openDialog(dialogOpenedData);
  };

  // This action add
  const addUserToGroupAction = (
    actionData: { [key: string]: any },
    rowBody: { [key: string]: any }
  ) => {
    const { url, body } = actionData;
    const { id } = rowBody;

    const dialogData: DialogData = {
      title: "Enter the group",
      contentText: "Do you want to join the group?",
      type: "ACCEPT_CANCEL_DIALOG",
      actionConfirm: () => {
        axios
          .post(
            url,
            { ...body, idGroup: id },
            {
              headers: {
                Authorization: authToken ? `Bearer ${authToken}` : "",
              },
            }
          )
          .then((resp) => {
            showSnackbar("User added to group");

            const { userData } = resp.data;

            setUserData(userData as UserData);
            renewToken();
          })
          .catch((error) => console.log(error));
      },
    };

    openDialog(dialogData);
  };

  return { userData, onClickGeneralTableAction };
};
