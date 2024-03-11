import React from "react";
import styles from "./UserHomeWidget.module.scss";

import GroupHomeWidget from "../GroupHomeWidget/GroupHomeWidget";
import Spinner from "@/components/common/Spinner";
import { Card, Typography } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import { useGetData } from "@/hooks/useGetData";
import { GroupData } from "@/types/group.types";

const UserHomeWidget = () => {
  const { userData } = useAuthContext();
  const { isLoading, data } = useGetData<GroupData>(
    userData?.idGroup ? `/api/group/groups/${userData.idGroup}` : ""
  );

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.container}>
      <Typography className={styles.title} variant="h3">
        Home
      </Typography>

      <Card className={styles.cardContainer}>
        <Typography variant="h5" className={styles.subtitle}>
          User data
        </Typography>
        <Typography className={styles.row} variant="body1">
          <b>User:</b> {userData?.name} {userData?.surname}
        </Typography>
        <Typography className={styles.row} variant="body1">
          <b>Email:</b> {userData?.email}
        </Typography>
      </Card>

      <Card className={styles.cardContainer}>
        <Typography variant="h5" className={styles.subtitle}>
          Group
        </Typography>
        <div className={styles.row}>
          {data ? (
            <GroupHomeWidget groupData={data} />
          ) : (
            <Typography variant="body1">
              You don't belong to any group
            </Typography>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserHomeWidget;
