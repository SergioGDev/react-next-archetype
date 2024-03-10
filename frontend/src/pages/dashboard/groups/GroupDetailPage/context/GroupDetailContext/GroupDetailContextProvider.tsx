import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import { GroupDetailContext } from "./GroupDetailContext";
import { GroupDetailContextProps } from "./groupDetailContext.types";
import { GroupData } from "@/types/group.types";

import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_TOKEN } from "@/context/AuthContext/authContext.consts";

export const GroupDetailContextProvider = ({ children }: PropsWithChildren) => {
  const { id } = useParams<{ id: string }>()!;
  const authToken = Cookies.get(AUTH_TOKEN);

  const [groupData, setGroupData] = useState<GroupData>();
  const [loading, setLoading] = useState(true);
  const [loadingFindUsers, setLoadingFindUsers] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get<GroupData>(`/api/group/groups/${id}`, {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      })
      .then((resp) => {
        const { data } = resp;
        setGroupData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const providerObject: GroupDetailContextProps = {
    groupData,
    loading,
    loadingFindUsers,

    // Add here the methods of the provider
    setGroupData,
    setLoading,
    setLoadingFindUsers,
  };

  return (
    <GroupDetailContext.Provider value={providerObject}>
      {children}
    </GroupDetailContext.Provider>
  );
};

export const useGroupDetailContext = () => useContext(GroupDetailContext);
