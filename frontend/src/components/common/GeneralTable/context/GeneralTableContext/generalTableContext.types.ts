import { GeneralTableHeaderData, Order } from "../../generalTable.types";

export type GeneralTableContextType<T extends Object> = {
  headers: GeneralTableHeaderData[];
  rows: T[];
  order: Order;
};

export type GeneralTableContextProps<T extends Object> =
  GeneralTableContextType<T> & {
    setInitValues: (
      headers: GeneralTableHeaderData[],
      rows: T[],
      order?: Order
    ) => void;
  };
