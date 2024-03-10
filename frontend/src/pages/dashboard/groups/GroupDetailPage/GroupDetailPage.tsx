import React, { useEffect, useState } from "react";
import styles from "./GroupDetailPage.module.scss";

import FindUserFormWidget from "./widgets/FindUserFormWidget/FindUserFormWidget";
import GeneralTable from "@/components/common/GeneralTable/GeneralTable";
import Spinner from "@/components/common/Spinner";
import { Card, Typography } from "@mui/material";
import { formatDate } from "@/helpers/formatDate";
import { headersUserListDataTable } from "./groupDetailPage.consts";
import { getRowsUsersData } from "./groupDetailPage.helpers";
import {
  GroupDetailContextProvider,
  useGroupDetailContext,
} from "./context/GroupDetailContext/GroupDetailContextProvider";

const GroupDetailPage = () => {
  return (
    <GroupDetailContextProvider>
      <GroupDetailPageContent />
    </GroupDetailContextProvider>
  );
};

const GroupDetailPageContent = () => {
  const { loading, groupData } = useGroupDetailContext();

  if (loading === true) return <Spinner />;

  if (!groupData) {
    return (
      <div className={styles.container}>
        <Card sx={{ padding: 4 }}>No data obtained...</Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        {groupData.name}
      </Typography>

      <Card sx={{ padding: 4 }}>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Created at: {formatDate(groupData.creationDate)}
        </Typography>
        <Typography variant="body1">{groupData.description}</Typography>

        <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
          Users of the group
        </Typography>

        <GeneralTable
          tableHeaders={headersUserListDataTable}
          tableRows={getRowsUsersData(groupData.userList ?? [])}
        />

        <Typography variant="h5" sx={{ marginTop: 5, marginBottom: 2 }}>
          Add users to your group
        </Typography>

        <Typography variant="body2" sx={{ color: "gray" }}>
          Find here the email of the user to add him or her to this group:
        </Typography>

        <FindUserFormWidget />
      </Card>
    </div>
  );
};

export default GroupDetailPage;
