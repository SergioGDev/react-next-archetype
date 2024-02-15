import { GeneralTableActionType, GeneralTableHeaderData } from "@/components/common/GeneralTable/generalTable.types";
import { Edit } from "@mui/icons-material";

export const headersGroupDataTable: GeneralTableHeaderData[] = [
  { id: 'name', label: 'Name', type: 'string' },
  { id: 'creatorId', label: 'Email creator', type: 'string' },
  { id: 'description', label: 'Description', type: 'string' },
]

export const actionsGroupTable: GeneralTableActionType[] = [
  {
    Icon: Edit,
    codeAction: () => {},
    actionType: "GO_TO_PAGE_ACTION",
    showCondition: true
  },
]