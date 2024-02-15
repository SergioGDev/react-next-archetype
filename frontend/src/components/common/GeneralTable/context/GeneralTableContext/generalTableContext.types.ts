import { GeneralTableActionType, GeneralTableHeaderData, GeneralTableRowType, Order } from "../../generalTable.types";

export type GeneralTableContextType = {
  headers: GeneralTableHeaderData[];
  rows: GeneralTableRowType[];
  tableActions?: GeneralTableActionType[];
  order: Order;
  orderBy?: string;
  page: number;
  rowsPerPage: number;
  colspan: number;
  listOfRowsPerPage: number[];
};

export type GeneralTableContextProps = GeneralTableContextType & {
    setInitValues: (initValues: GeneralTableContextType) => void;
    setPage: (page: number) => void;
    setOrder: (order: Order) => void;
    setOrderBy: (orderBy: string) => void;
    setRowsPerPage: (rowsPerPage: number) => void;
  };
