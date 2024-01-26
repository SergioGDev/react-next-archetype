export type GeneralTableProps = {
  tableHeaders: GeneralTableHeaderData[];
  tableRows: GeneralTableRowType[];
};

export type GeneralTableHeaderData = {
  id: string;
  label: string;
  type: "string" | "number";
  sorted?: Order;
};

export type GeneralTableRowType = {
  tableRow: GeneralTableCellType[];
};

export type GeneralTableCellType = {
  id: string;
  cellData: string | number;
  position: number;
};

export type Order = "asc" | "desc";
