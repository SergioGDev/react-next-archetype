import { GeneralTableHeaderData, Order } from "../../generalTable.types";
import { GeneralTableContextType } from "./generalTableContext.types";

export const createInitialGeneralTableContextState = <T extends object>(
    headers: GeneralTableHeaderData[],
    initialRows: T[],
    order: Order = "asc"
  ): GeneralTableContextType<T> => ({
    headers,
    rows: initialRows,
    order,
  });
