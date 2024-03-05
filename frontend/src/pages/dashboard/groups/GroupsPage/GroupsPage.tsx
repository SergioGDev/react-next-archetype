import React from "react";

import MyGroupData from "./components/MyGroupData/MyGroupData";
import GroupsTable from "./components/GroupsTable/GroupsTable";
import { useAuthContext } from "@/context/AuthContext";

const GroupsPage = () => {
  const { userData } = useAuthContext();
  console.log(userData);

  return userData?.role === "USER_ROLE" && userData?.idGroup ? (
    <MyGroupData />
  ) : (
    <GroupsTable />
  );
};

export default GroupsPage;
