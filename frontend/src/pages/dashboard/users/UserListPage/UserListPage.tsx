import React from "react";

import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import Spinner from "@/components/common/Spinner";
import { useUserListPage } from "./hooks/useUserListPage";
import { getRowsUserData } from "./userListPage.helper";
import { Box, Typography } from "@mui/material";
import { headersUserDataTable } from "./userListPage.consts";

const UserListPage = () => {
  const { isLoading, data } = useUserListPage();

  if (isLoading || !data) return <Spinner />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">User list</Typography>
      <GeneralTable
        tableRows={getRowsUserData(data!.userList)}
        tableHeaders={headersUserDataTable}
      />
    </Box>
  );
};

export default UserListPage;
