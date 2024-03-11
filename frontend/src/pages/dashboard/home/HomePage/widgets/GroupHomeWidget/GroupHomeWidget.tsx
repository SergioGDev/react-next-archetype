import React from "react";
import styles from "./GroupHomeWidget.module.scss";

import { GroupHomeWidgetProps } from "./groupHomeWidget.types";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const GroupHomeWidget = ({ groupData }: GroupHomeWidgetProps) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Typography>
        <b>Name:</b> {groupData.name}
      </Typography>
      <Typography>
        <b>Description:</b> {groupData.description}
      </Typography>
      <div className={styles.buttonContainer}>
        <Button
          color="primary"
          onClick={() => router.push("/dashboard/groups")}
        >
          Group details
        </Button>
      </div>
    </div>
  );
};

export default GroupHomeWidget;
