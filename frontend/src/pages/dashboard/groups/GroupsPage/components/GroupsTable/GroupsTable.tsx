import React, { useEffect, useState } from "react";

import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import Spinner from "@/components/common/Spinner";
import { useGroupsTable } from "./hooks/useGroupsTable";
import { getRowsGroupsData } from "./groupsTable.helper";
import { headersGroupDataTable } from "./groupsTable.consts";
import { GroupData, GroupListPageApiRespData } from "@/types/group.types";

import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { getRequest } from "@/helpers/request/getRequest";

const GroupsTable = () => {
  const { userData, actionsGroupTable } = useGroupsTable();
  const [isLoading, setisLoading] = useState(true);
  const [data, setData] = useState<GroupData[]>();
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      setisLoading(true);
      getRequest<GroupListPageApiRespData>(
        "/api/group/groups",
        getQueryParams()
      ).then((resp) => {
        const { groups } = resp.data;
        setData(groups);
        setisLoading(false);
      });
    }
  }, [userData]);

  const getQueryParams = (): { [key: string]: string } => {
    const queryParams: { [key: string]: string } = {};
    if (userData && userData.role === "COORDINATOR_ROLE") {
      queryParams["creatorId"] = userData.email;
    }
    return queryParams;
  };

  if (isLoading) return <Spinner />;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">Groups</Typography>

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
        tableRows={getRowsGroupsData(data)}
        tableHeaders={headersGroupDataTable}
        tableActions={actionsGroupTable}
      />
    </Box>
  );
};

export default GroupsTable;
