import { GeneralTableHeaderData, Order } from "../../generalTable.types";
import { GeneralTableContextType } from "./generalTableContext.types";

type GeneralTableContextAction<T extends Object> = {
  type: "setInitValues";
  payload: {
    headers: GeneralTableHeaderData[];
    rows: T[];
    order: Order;
  };
};

export const GeneralTableContextReducer = <T extends Object>(
  state: GeneralTableContextType<T>,
  action: GeneralTableContextAction<T>
): GeneralTableContextType<T> => {
  switch (action.type) {
    case "setInitValues":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
