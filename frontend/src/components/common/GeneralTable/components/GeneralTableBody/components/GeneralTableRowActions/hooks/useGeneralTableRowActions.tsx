import { GeneralTableAction } from "@/components/common/GeneralTable/generalTable.types";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import axios from "axios";
import Cookies from "js-cookie";

export const useGeneralTableRowActions = () => {
  const { userData } = useAuthContext();
  const router = useRouter();
  const authToken = Cookies.get("authToken");

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

        case "POST_ACTION":
          postAction(actionData, body);
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
  const postAction = (
    actionData: { [key: string]: any },
    body: { [key: string]: any }
  ) => {
    const { path } = actionData;
    const { id, userId } = body;

    const url = (path as string).replace(":id", userId);
    axios.post(
      url,
      { idGroup: id },
      { headers: { Authorization: authToken ? `Bearer ${authToken}` : "" } }
    );
  };

  return { userData, onClickGeneralTableAction };
};
