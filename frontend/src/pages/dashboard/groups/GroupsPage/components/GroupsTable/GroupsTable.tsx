import React from "react";

import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import Spinner from "@/components/common/Spinner";
import { useGroupsTable } from "./hooks/useGroupsTable";
import { getRowsGroupsData } from "./groupsTable.helper";
import { headersGroupDataTable } from "./groupsTable.consts";
import { useGetData } from "@/hooks/useGetData";
import { GroupListPageApiRespData } from "@/types/group.types";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const GroupsTable = () => {
  const { userData, actionsGroupTable } = useGroupsTable();
  const router = useRouter();

  const getQueryParams = (): { [key: string]: string } => {
    const queryParams: { [key: string]: string } = {};
    if (userData && userData.role === "COORDINATOR_ROLE") {
      queryParams["creatorId"] = userData.email;
    }
    return queryParams;
  };

  const { data, isLoading } = useGetData<GroupListPageApiRespData>(
    "/api/group/groups",
    getQueryParams()
  );

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Groups</Typography>

      <Typography variant="body1">Find here your group:</Typography>
      
      {userData?.role !== "USER_ROLE" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 1,
            paddingY: 1,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push("/dashboard/groups/add")}
          >
            Add new group
          </Button>
        </Box>
      )}

      <GeneralTable
        tableRows={getRowsGroupsData(data?.groups)}
        tableHeaders={headersGroupDataTable}
        tableActions={actionsGroupTable}
      />
    </Box>
  );
};

export default GroupsTable;
