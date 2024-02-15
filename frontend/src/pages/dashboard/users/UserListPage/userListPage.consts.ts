import { GeneralTableActionType, GeneralTableHeaderData } from "@/components/common/GeneralTable/generalTable.types";
import { Edit } from "@mui/icons-material";

export const headersUserDataTable: GeneralTableHeaderData[] = [
  { id: 'name', label: "Name", type: "string" },
  { id: 'email', label: "Email", type: "string" },
  { id: 'role', label: "Role", type: "string" },
];
