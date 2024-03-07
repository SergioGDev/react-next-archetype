import React from "react";
import styles from "./GroupDetailPage.module.scss";

import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import Spinner from "@/components/common/Spinner";
import { useParams } from "next/navigation";
import { useGetData } from "@/hooks/useGetData";
import { Card, Typography } from "@mui/material";
import { GroupData } from "@/types/group.types";
import { formatDate } from "@/helpers/formatDate";
import { headersUserListDataTable } from "./groupDetailPage.consts";
import { getRowsUsersData } from "./groupDetailPage.helpers";

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

        <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
          Users of the group
        </Typography>

        <GeneralTable
          tableHeaders={headersUserListDataTable}
          tableRows={getRowsUsersData(data.userList ?? [])}
        />
      </Card>
    </div>
  );
};

export default GroupDetailPage;
