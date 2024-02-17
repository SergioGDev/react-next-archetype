import React, { useEffect } from "react";
import styles from "./GroupDetailPage.module.scss";
import { useParams } from "next/navigation";
import { useGetData } from "@/hooks/useGetData";
import Spinner from "@/components/common/Spinner";
import { Card, Typography } from "@mui/material";
import { GroupData } from "@/types/group.types";
import { formatDate } from "@/helpers/formatDate";

const GroupDetailPage = () => {
  const { id } = useParams<{ id: string }>()!;
  const { isLoading, data } = useGetData<GroupData>(
    `/api/group/groups/${id}`,
    {},
    true
  );

  if (isLoading) return <Spinner />;

  if (!data)
    return (
      <div className={styles.container}>
        <Card sx={{ padding: 4 }}>No data obtained...</Card>
      </div>
    );

  return (
    <div className={styles.container}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        {data.name}
      </Typography>

      <Card sx={{ padding: 4 }}>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Created at: {formatDate(data.creationDate)}
        </Typography>
        <Typography variant="body1">{data.description}</Typography>

        <Typography variant="h5" sx={{ marginTop: 4 }}>
          Users of the group
        </Typography>
        {/* Add here a table with the users of the group */}
      </Card>
    </div>
  );
};

export default GroupDetailPage;
