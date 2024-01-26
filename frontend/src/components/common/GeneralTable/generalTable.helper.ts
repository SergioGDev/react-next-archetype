import { GeneralTableRowType, Order } from "./generalTable.types";

export const sortRowsById = (
  rows: GeneralTableRowType[],
  sortById: string,
  order: Order
): GeneralTableRowType[] => {
  return rows.slice().sort((a, b) => {
    const cellA = a.tableRow.find((cell) => cell.id === sortById);
    const cellB = b.tableRow.find((cell) => cell.id === sortById);

    if (cellA && cellB) {
      // Compara las celdas numéricamente o alfabéticamente según el tipo de datos
      if (
        typeof cellA.cellData === "number" &&
        typeof cellB.cellData === "number"
      ) {
        return order === "asc"
          ? cellA.cellData - cellB.cellData
          : cellB.cellData - cellA.cellData;
      } else {
        return order === "asc"
          ? String(cellA.cellData).localeCompare(String(cellB.cellData))
          : String(cellB.cellData).localeCompare(String(cellA.cellData));
      }
    }

    return 0;
  });
};
