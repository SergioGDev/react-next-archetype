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
  cellData: string | number;
  position: number;
};

export type Order = "asc" | "desc";

// ACTIONS TYPES
export type GeneralTableActionType = {
  Icon: SvgIconComponent;
  actionType: GeneralTableAction;
  codeAction?: (...atr: any) => void;
  showCondition?: boolean;
}

export type GeneralTableAction =
  | "GO_TO_PAGE_ACTION"
  | "DELETE_ACTION";
