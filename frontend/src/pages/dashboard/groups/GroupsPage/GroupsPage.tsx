import React from "react";

import Spinner from "@/components/common/Spinner";
import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import { useGetData } from "@/hooks/useGetData";
import { useAuthContext } from "@/context/AuthContext";
import { getRowsGroupsData } from "./groupsPage.helpers";
import { GroupListPageApiRespData } from "@/types/group.types";
import { headersGroupDataTable } from "./groupsPage.consts";

import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useGroupsPage } from "./hooks/useGroupsPage";

const GroupsPage = () => {
  const { actionsGroupTable } = useGroupsPage();
  const router = useRouter();
  const { userData } = useAuthContext();

  const getQueryParams = (): { [key: string]: string } => {
    const queryParams: { [key: string]: string } = {};
    if (userData && userData.role === "COORDINATOR_ROLE") {
      queryParams['creatorId'] = userData.email;
    }
    return queryParams;
  }

  const { data, isLoading } = useGetData<GroupListPageApiRespData>(
    "/api/group/groups",
    getQueryParams()
  );

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h3">Groups</Typography>
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

      <GeneralTable
        tableRows={getRowsGroupsData(data?.groups)}
        tableHeaders={headersGroupDataTable}
        tableActions={actionsGroupTable}
      />

    </Box>
  );
};

export default GroupsPage;
