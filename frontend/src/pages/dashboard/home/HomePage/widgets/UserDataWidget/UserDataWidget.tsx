import React from "react";
import styles from "./UserDataWidget.module.scss";
import { Card, Typography } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";

const UserDataWidget = () => {
  const { userData } = useAuthContext();
  return (
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
  );
};

export default UserDataWidget;
