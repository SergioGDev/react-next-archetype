import { Order } from "../../generalTable.types";
import { GeneralTableContextType } from "./generalTableContext.types";

type GeneralTableContextAction =
  | {
      type: "setInitValues";
      payload: GeneralTableContextType;
    }
  | { type: "setOrder"; payload: Order }
  | {
      type: "setOrderBy";
      payload: string;
    }
  | { type: "setPage"; payload: number }
  | { type: "setRowsPerPage"; payload: number };

export const GeneralTableContextReducer = (
  state: GeneralTableContextType,
  action: GeneralTableContextAction
): GeneralTableContextType => {
  switch (action.type) {
    case "setInitValues":
      return {
        ...action.payload,
      };

    case "setOrder":
      return { ...state, order: action.payload };

    case "setOrderBy":
      return { ...state, orderBy: action.payload };

    case "setPage":
      return { ...state, page: action.payload };

    case "setRowsPerPage":
      return { ...state, rowsPerPage: action.payload };

    default:
      return state;
  }
};
