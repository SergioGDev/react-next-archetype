import React from "react";

import { useGeneralTableContext } from "../../context/GeneralTableContext/GeneralTableContextProvider";
import { TablePagination } from "@mui/material";

const GeneralTablePagination = () => {
  const {
    rows,
    listOfRowsPerPage,
    rowsPerPage,
    page,
    setPage,
    setRowsPerPage,
  } = useGeneralTableContext();

  return (
    <TablePagination
      rowsPerPageOptions={listOfRowsPerPage}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(event, newPage) => setPage(newPage)}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      }}
    />
  );
};

export default GeneralTablePagination;
