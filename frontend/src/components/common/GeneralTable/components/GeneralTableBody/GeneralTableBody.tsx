import React from "react";

import { sortRowsById } from "../../generalTable.helper";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useGeneralTableContext } from "../../context/GeneralTableContext/GeneralTableContextProvider";
import { sortCellsByPosition } from "./generalTableBody.helper";

const GeneralTableBody = () => {
  const { order, orderBy, page, rowsPerPage, rows, colspan } =
    useGeneralTableContext();

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    return (orderBy ? sortRowsById(rows, orderBy, order) : rows).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, rows]);

  return (
    <TableBody>
      {visibleRows.map(({ tableRow }, index) => {
        return (
          <TableRow hover key={`row-${index}`}>
            {sortCellsByPosition(tableRow).map(({ id, cellData }) => {
              return <TableCell key={`${index}-${id}`}>{cellData}</TableCell>;
            })}
          </TableRow>
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={colspan} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default GeneralTableBody;
