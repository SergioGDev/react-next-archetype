import React from "react";

import Spinner from "@/components/common/Spinner";
import { formatDate } from "@/helpers/formatDate";

import { Card, Typography, Box, Button } from "@mui/material";
import { useMyGroupData } from "./hooks/useMyGroupData";

const MyGroupData = () => {
  const { data, isLoading, onClickLeaveGroup } = useMyGroupData();

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

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
      >
        <Button color="error" onClick={onClickLeaveGroup}>
          Leave group
        </Button>
      </Box>
    </Box>
  );
};

export default MyGroupData;
