import { GeneralTableActionType } from "@/components/common/GeneralTable/generalTable.types";
import { Edit, RemoveRedEyeRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const useGroupsPage = () => {
  const actionsGroupTable: GeneralTableActionType[] = [
    {
      Icon: Edit,
      actionData: { path: '/dashboard/groups/edit/:id' },
      actionType: "GO_TO_PAGE_ACTION",
      showCondition: true,
    },
    {
      Icon: RemoveRedEyeRounded,
      actionData: { path: '/dashboard/groups/:id' },
      actionType: "GO_TO_PAGE_ACTION",
      showCondition: true,
    },
  ];

  return { actionsGroupTable }
};
