import { useAuthContext } from "@/context/AuthContext";
import { GeneralTableActionType } from "@/components/common/GeneralTable/generalTable.types";
import {
  ADMIN_ROLE,
  COORDINATOR_ROLE,
  USER_ROLE,
} from "@/consts/pattern.consts";
import {
  Edit,
  AddHomeWorkRounded,
  RemoveRedEyeRounded,
} from "@mui/icons-material";

export const useGroupsTable = () => {
  const { userData } = useAuthContext();

  const actionsGroupTable: GeneralTableActionType[] = [
    {
      Icon: Edit,
      iconTooltip: "Edit group",
      actionData: {
        path: "/dashboard/groups/edit/:id",
        roles: [ADMIN_ROLE, COORDINATOR_ROLE],
      },
      actionType: "GO_TO_PAGE_ACTION",
    },
    {
      Icon: RemoveRedEyeRounded,
      iconTooltip: "Group detail",
      actionData: {
        path: "/dashboard/groups/:id",
        roles: [ADMIN_ROLE, COORDINATOR_ROLE],
      },
      actionType: "GO_TO_PAGE_ACTION",
    },
    {
      Icon: AddHomeWorkRounded,
      iconTooltip: "Select group",
      actionData: {
        url: "/api/auth/update-user-data",
        roles: [USER_ROLE],
        body: {
          email: userData?.email,
          idGroup: userData?.idGroup,
        },
        dialogData: { title: "Título", contentText: "Descripción del diálogo" },
      },
      actionType: "ADD_USER_TO_GROUP_ACTION",
    },
  ];

  return { userData, actionsGroupTable };
};
