import React from "react";
import styles from "./HomePage.module.scss";

import { Box, Typography } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import UserHomeWidget from "./widgets/UserHomeWidget/UserHomeWidget";
import CoordinatorHomeWidget from "./widgets/CoordinatorHomeWidget/CoordinatorHomeWidget";
import AdminHomeWidget from "./widgets/AdminHomeWidget/AdminHomeWidget";
import Spinner from "@/components/common/Spinner";

const HomePage = () => {
  const { userData } = useAuthContext();

  if (userData?.role === "USER_ROLE") return <UserHomeWidget />;
  if (userData?.role === "COORDINATOR_ROLE") return <CoordinatorHomeWidget />;
  if (userData?.role === "ADMIN_ROLE") return <AdminHomeWidget />;

  return <Spinner />;
};

export default HomePage;
