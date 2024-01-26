import React from "react";

import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useGeneralTableContext } from "../../context/GeneralTableContext/GeneralTableContextProvider";
import { visuallyHidden } from '@mui/utils';

const GeneralTableHeader = () => {
  const { headers, orderBy, order, setOrder, setOrderBy } = useGeneralTableContext();

  return (
    <TableHead>
      <TableRow>
        {headers.map(({ id, label, type, sorted }, index) => (
          <TableCell
            key={`${index}-${label.replace(" ", "-")}`}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : "asc"}
              onClick={() => {
                const isAsc = orderBy === id && order === "asc";
                setOrder(isAsc ? "desc" : "asc");
                setOrderBy(id);
              }}
            >
              {label}
              {orderBy === id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default GeneralTableHeader;
