import { SvgIconComponent } from "@mui/icons-material";

export type GeneralTableProps = {
  tableHeaders: GeneralTableHeaderData[];
  tableRows: GeneralTableRowType[];
  tableActions?: GeneralTableActionType[];
};

// HEADER TYPES
export type GeneralTableHeaderData = {
  id: string;
  label: string;
  type: "string" | "number";
  sorted?: Order;
};

// ROW TYPES
export type GeneralTableRowType = {
  tableRow: GeneralTableCellType[];
};

export type GeneralTableCellType = {
  id: string;
  cellData: string | number | undefined;
  position: number;
  hiddenData?: boolean;
};

export type Order = "asc" | "desc";

// ACTIONS TYPES
export type GeneralTableActionType = {
  Icon: SvgIconComponent;
  iconTooltip?: string;
  actionType: GeneralTableAction;
  codeAction?: (...atr: any) => void;
  actionData?: { [key: string]: any };
};

export type GeneralTableAction =
  | "GO_TO_PAGE_ACTION"
  | "POST_WITH_ID_ROW_ACTION"
  | "POST_WITHOUT_ID_ROW_ACTION"
  | "ADD_USER_TO_GROUP_ACTION"
  | "DELETE_ACTION";
