import { GeneralTableContextType } from "./generalTableContext.types";

export const initialGeneralTableContextState: GeneralTableContextType = {
  rows: [],
  headers: [],
  order: "asc",
  page: 0,
  rowsPerPage: 10,
  colspan: 0,
  listOfRowsPerPage: [10, 20, 30],
};
