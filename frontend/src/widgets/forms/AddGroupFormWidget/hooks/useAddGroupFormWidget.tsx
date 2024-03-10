import { AddGroupForm } from "../addGroupFormWidget.types";
import { useAuthContext } from "@/context/AuthContext";
import { usePostData } from "@/hooks/usePostData";
import { useEffect, useState } from "react";
import { useGetData } from "@/hooks/useGetData";
import { GroupData } from "@/types/group.types";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSnackbarContext } from "@/context/SnackbarContext/SnackbarContextProvider";
import axios from "axios";
import Cookies from "js-cookie";
import { AUTH_TOKEN } from "@/context/AuthContext/authContext.consts";

export const useAddGroupFormWidget = () => {
  const { id } = useParams<{ id?: string }>()!;
  const router = useRouter();
  const authToken = Cookies.get(AUTH_TOKEN);
  const [, setLoadingData] = useState(false);
  const { userData } = useAuthContext();
  const { showSnackbar } = useSnackbarContext();

  const methods = useForm<AddGroupForm>();

  const { data: groupData, isLoading: isLoadingGroup } = useGetData<GroupData>(
    id ? `/api/group/groups/${id}` : ""
  );

  const { postData, data, isLoading } = usePostData(
    "/api/group/register-group"
  );

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = methods;

  useEffect(() => {
    if (id && groupData) {
      reset({
        name: groupData.name,
        description: groupData.description,
        creatorId: groupData.creatorId,
      });
    }
  }, [groupData]);

  // Set the value if the user is coordinator
  useEffect(() => {
    if (userData?.role === "COORDINATOR_ROLE") {
      setValue("creatorId", userData.email);
    }
  }, [userData]);

  // When the data is received, we'll return to previous window
  useEffect(() => {
    if (data) {
      router.back();
      // Use snackbar context
    }
  }, [data]);

  // Handle the submit of the form
  const handleOnSubmit = async () => {
    console.log(id);
    if (!id) {
      postData(watch());
    } else {
      const { name, description } = watch();
      setLoadingData(true);

      const respUpdate = await axios.post<GroupData>(
        `/api/group/edit/${id}`,
        { name, description },
        {
          headers: {
            Authorization: authToken ? `Bearer ${authToken}` : "",
          },
        }
      );

      if (!respUpdate) {
        showSnackbar("Error updating group data");
        setLoadingData(false);
        return;
      }

      console.log(respUpdate);

      showSnackbar("Group data updated");
      setLoadingData(false);
      router.back();
    }
  };

  return {
    groupData,
    isLoadingGroup,
    userData,
    methods,
    handleSubmit,
    handleOnSubmit,
    errors,
    isLoading,
    isValid,
  };
};
