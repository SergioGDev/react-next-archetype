import { UserData } from "@/context/AuthContext/authContext.types";
import { GroupData } from "@/types/group.types";
import { Dispatch, SetStateAction } from "react";

export type GroupDetailContextType = {
    groupData?: GroupData;
    loading: boolean;
    loadingFindUsers: boolean;
    id?: string;
};

export type GroupDetailContextProps = GroupDetailContextType & {
    setGroupData: Dispatch<SetStateAction<GroupData | undefined>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setLoadingFindUsers: Dispatch<SetStateAction<boolean>>;
};
