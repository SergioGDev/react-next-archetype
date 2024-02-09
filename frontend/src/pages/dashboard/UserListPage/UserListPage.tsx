import React from "react";

import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import Spinner from "@/components/common/Spinner";
import { useUserListPage } from "./hooks/useUserListPage";
import { getRowsUserData } from "./userListPage.helper";
import { headersUserDataTable } from "./userListPage.consts";

import { Box, Typography } from "@mui/material";

const UserListPage = () => {
  const { isLoading, data } = useUserListPage();

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 5 }}>
      <Typography variant="h3">User list</Typography>
      <GeneralTable
        tableRows={getRowsUserData(data!.userList)}
        tableHeaders={headersUserDataTable}
      />
    </Box>
  );
};

export default UserListPage;
