import React, { useContext, useEffect } from "react";

import GeneralTableBody from "./components/GeneralTableBody/GeneralTableBody";
import GeneralTableHeader from "./components/GeneralTableHeader/GeneralTableHeader";
import { GeneralTableProps } from "./generalTable.types";
import {
  GeneralTableContextProvider,
  useGeneralTableContext,
} from "./context/GeneralTableContext/GeneralTableContextProvider";

import {
  Paper,
  TableContainer,
  Box,
  TablePagination,
  Table,
} from "@mui/material";
import GeneralTablePagination from "./components/GeneralTablePagination/GeneralTablePagination";

const GeneralTable = (props: GeneralTableProps) => {
  return (
    <GeneralTableContextProvider>
      <GeneralTableContainer {...props} />
    </GeneralTableContextProvider>
  );
};

const GeneralTableContainer = ({
  tableHeaders,
  tableRows,
}: GeneralTableProps) => {
  const {
    setInitValues,
    rows,
    listOfRowsPerPage,
    rowsPerPage,
    page,
    setPage,
    setRowsPerPage,
  } = useGeneralTableContext();

  useEffect(
    () =>
      setInitValues({
        headers: tableHeaders,
        rows: tableRows,
        order: "asc",
        rowsPerPage: 10,
        colspan: tableRows.length > 0 ? tableRows[0].tableRow.length : 1,
        listOfRowsPerPage: [10, 20, 30],
        page: 0,
      }),
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            {/* Header */}
            <GeneralTableHeader />

            {/* Body */}
            <GeneralTableBody />
          </Table>
        </TableContainer>

        <GeneralTablePagination />
      </Paper>
    </Box>
  );
};

export default GeneralTable;
