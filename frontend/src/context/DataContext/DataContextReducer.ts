import { DataContextType } from "./dataContext.types";
import { Item } from "./dataContext.types";

type DataAction =
  | { type: "addItem"; payload: Item }
  | { type: "removeItem"; payload: number };

const DataContextReducer = (
  state: DataContextType,
  action: DataAction
): DataContextType => {
  switch (action.type) {
    case "addItem":
      // Put here the new state after the action
      return { ...state, dataList: [...state.dataList, action.payload] };

    case "removeItem":
      // Put here the new state after the action
      return {
        ...state,
        dataList: state.dataList.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export default DataContextReducer;
