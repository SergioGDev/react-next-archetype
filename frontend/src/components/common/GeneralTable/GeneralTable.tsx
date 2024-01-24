import React from "react";
import styles from "./GeneralTable.module.scss";

import GeneralTableBody from "./components/GeneralTableBody/GeneralTableBody";
import GeneralTableHeader from "./components/GeneralTableHeader/GeneralTableHeader";
import { Data, GeneralTableProps, Order } from "./generalTable.types";
import { rows } from "./generalTable.consts";

import {
  Paper,
  TableContainer,
  Box,
  TablePagination,
  Table,
} from "@mui/material";
import { useGeneralTable } from "./hooks/useGeneralTable";
import { GeneralTableContextProvider, useGeneralTableContext } from "./context/GeneralTableContext/GeneralTableContextProvider";

const GeneralTable = <T extends Object>({
  rows,
  headers,
}: GeneralTableProps<T>) => {
  const {setInitValues} = useGeneralTableContext();

  const {
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    rowsPerPage,
    page,
    selected,
    orderBy,
    order,
  } = useGeneralTable();

  setInitValues(headers, rows);  

  return (
    // <GeneralTableBody />
    <GeneralTableContextProvider>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              {/* Header */}
              <GeneralTableHeader
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />

              {/* Body */}
              <GeneralTableBody />
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </GeneralTableContextProvider>
  );
};

export default GeneralTable;
