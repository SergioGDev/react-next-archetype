import React from "react";
import styles from "./SettingsPage.module.scss";

import EditUserDataWidget from "./widgets/EditUserDataWidget/EditUserDataWidget";
import { Typography } from "@mui/material";

const SettingsPage = () => {
  return (
    <div className={styles.container}>
      <Typography variant="h4">Settings</Typography>
      <EditUserDataWidget />
    </div>
  );
};

export default SettingsPage;
