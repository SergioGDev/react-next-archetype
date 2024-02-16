import { GeneralTableActionType } from "@/components/common/GeneralTable/generalTable.types";
import { Edit, RemoveRedEyeRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const useGroupsPage = () => {
  const router = useRouter();

  const actionsGroupTable: GeneralTableActionType[] = [
    {
      Icon: Edit,
      codeAction: (id: string) => {
        router.push(`/dashboard/groups/edit/${id}`)
      },
      actionType: "GO_TO_PAGE_ACTION",
      showCondition: true,
    },
    {
      Icon: RemoveRedEyeRounded,
      codeAction: (id: string) => {
        router.push(`/dashboard/groups/${id}`)
      },
      actionType: "GO_TO_PAGE_ACTION",
      showCondition: true,
    },
  ];

  return { actionsGroupTable }
};
