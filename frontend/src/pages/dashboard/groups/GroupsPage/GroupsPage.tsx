import React, { useMemo } from "react";

import MyGroupData from "./components/MyGroupData/MyGroupData";
import GroupsTable from "./components/GroupsTable/GroupsTable";
import { useAuthContext } from "@/context/AuthContext";

const GroupsPage = () => {
  const { userData } = useAuthContext();
  const showMyGroupData = useMemo(
    () => userData?.role === "USER_ROLE" && userData?.idGroup,
    [userData?.idGroup, userData?.role]
  );

  return showMyGroupData ? <MyGroupData /> : <GroupsTable />;
};

export default GroupsPage;
