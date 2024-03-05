import React from "react";

import Spinner from "../../../../../../components/common/Spinner";
import { useAuthContext } from "@/context/AuthContext";
import { useGetData } from "@/hooks/useGetData";
import { GroupData } from "@/types/group.types";
import { formatDate } from "@/helpers/formatDate";

import { Card, Typography, Box } from "@mui/material";

const MyGroupData = () => {
  const { userData } = useAuthContext();
  const { data, isLoading } = useGetData<GroupData>(
    userData?.idGroup ? `/api/group/groups/${userData.idGroup}` : ""
  );

  if (isLoading) return <Spinner />;
  if (!data)
    return <Card sx={{ padding: 4 }}>Error getting group data...</Card>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        My group
      </Typography>

      <Card sx={{ padding: 4 }}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          {data.name}
        </Typography>

        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Created at: {formatDate(data.creationDate)}
        </Typography>
        <Typography variant="body1">{data.description}</Typography>
      </Card>
    </Box>
  );
};

export default MyGroupData;
