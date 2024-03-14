import React from "react";
import styles from "./UserHomeWidget.module.scss";

import Spinner from "@/components/common/Spinner";
import UserDataWidget from "../UserDataWidget/UserDataWidget";
import { useAuthContext } from "@/context/AuthContext";
import { useGetData } from "@/hooks/useGetData";
import { GroupData } from "@/types/group.types";

import { Card, Typography } from "@mui/material";

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

      <UserDataWidget />
    </div>
  );
};

export default UserHomeWidget;
