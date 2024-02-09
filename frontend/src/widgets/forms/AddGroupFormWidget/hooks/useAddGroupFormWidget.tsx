import { useForm } from "react-hook-form";
import { AddGroupForm } from "../addGroupFormWidget.types";
import { useAuthContext } from "@/context/AuthContext";
import { usePostData } from "@/hooks/usePostData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAddGroupFormWidget = () => {
  const methods = useForm<AddGroupForm>();
  const router = useRouter();
  const { userData } = useAuthContext();

  const { postData, data, isLoading } = usePostData(
    "/api/group/register-group"
  );

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = methods;

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
    userData,
    methods,
    handleSubmit,
    handleOnSubmit,
    errors,
    isLoading,
    isValid,
  };
};
