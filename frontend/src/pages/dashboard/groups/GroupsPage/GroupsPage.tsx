import React, { useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useGetData } from "@/hooks/useGetData";
import Spinner from "@/components/common/Spinner";
import { useAuthContext } from "@/context/AuthContext";
import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import { getRowsGroupsData } from "./groupsPage.helpers";
import { GroupData, GroupListPageApiRespData } from "@/types/group.types";
import { headersGroupDataTable } from "./groupsPage.consts";

const GroupsPage = () => {
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
    getQueryParams(),
    true
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 5 }}>
      <Typography variant="h3">Groups</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: 1,
          paddingX: 5,
          paddingY: 3,
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
        tableRows={getRowsGroupsData(data!.groups)}
        tableHeaders={headersGroupDataTable}
      />

    </Box>
  );
};

export default GroupsPage;
