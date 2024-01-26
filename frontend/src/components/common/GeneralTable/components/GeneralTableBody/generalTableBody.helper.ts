import { GeneralTableCellType } from "../../generalTable.types";

export const sortCellsByPosition = (tableRow: GeneralTableCellType[]): GeneralTableCellType[] => {
  return tableRow.slice().sort((a, b) => a.position - b.position);
};