import { useForm } from "react-hook-form";
import { AddGroupForm } from "../addGroupFormWidget.types";
import { useAuthContext } from "@/context/AuthContext";
import { usePostData } from "@/hooks/usePostData";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetData } from "@/hooks/useGetData";
import { GroupData } from "@/types/group.types";

export const useAddGroupFormWidget = () => {
  const { id } = useParams<{ id: string }>()!;
  const methods = useForm<AddGroupForm>();
  const router = useRouter();
  const { userData } = useAuthContext();

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
      })
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
  const handleOnSubmit = () => {
    postData(watch());
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
