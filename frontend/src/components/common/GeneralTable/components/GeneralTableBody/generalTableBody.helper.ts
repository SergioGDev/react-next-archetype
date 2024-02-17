import { GeneralTableCellType } from "../../generalTable.types";

export const sortCellsByPosition = (
  tableRow: GeneralTableCellType[]
): GeneralTableCellType[] => {
  return tableRow
    .filter(
      ({ hiddenData, position }: GeneralTableCellType) =>
        (hiddenData !== undefined || hiddenData !== false) && position !== -1
    )
    .slice()
    .sort((a, b) => a.position - b.position);
};
