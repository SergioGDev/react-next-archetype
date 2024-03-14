import React from "react";
import styles from "./MyGroupData.module.scss";

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
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.title}>
        My group
      </Typography>

      <Card className={styles.card}>
        <Typography variant="h5" sx={{ marginBottom: 4 }}>
          {data.name}
        </Typography>

        <Typography variant="body2" className={styles.createdAt}>
          Created at: {formatDate(data.creationDate)}
        </Typography>
        <Typography variant="body1">{data.description}</Typography>
      </Card>

      <Box className={styles.leaveGroupContainer}>
        <Button color="error" onClick={onClickLeaveGroup}>
          Leave group
        </Button>
      </Box>
    </Box>
  );
};

export default MyGroupData;
