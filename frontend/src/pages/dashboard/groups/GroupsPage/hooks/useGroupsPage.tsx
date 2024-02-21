import { GeneralTableActionType } from "@/components/common/GeneralTable/generalTable.types";
import {
  ADMIN_ROLE,
  COORDINATOR_ROLE,
  USER_ROLE,
} from "@/consts/pattern.consts";
import {
  AddHomeWorkRounded,
  Edit,
  RemoveRedEyeRounded,
} from "@mui/icons-material";

export const useGroupsPage = () => {
  const actionsGroupTable: GeneralTableActionType[] = [
    {
      Icon: Edit,
      iconTooltip: 'Edit group',
      actionData: {
        path: "/dashboard/groups/edit/:id",
        roles: [ADMIN_ROLE, COORDINATOR_ROLE],
      },
      actionType: "GO_TO_PAGE_ACTION",
      showCondition: true,
    },
    {
      Icon: RemoveRedEyeRounded,
      iconTooltip: 'Group detail',
      actionData: {
        path: "/dashboard/groups/:id",
        roles: [ADMIN_ROLE, COORDINATOR_ROLE],
      },
      actionType: "GO_TO_PAGE_ACTION",
      showCondition: true,
    },
    {
      Icon: AddHomeWorkRounded,
      iconTooltip: 'Select group',
      actionData: { path: "/dashboard/groups/:id", roles: [USER_ROLE] },
      actionType: "POST_ACTION",
      showCondition: true,
    },
  ];

  return { actionsGroupTable };
};
