import React, { useEffect } from "react";

import Spinner from "@/components/common/Spinner";
import FormControlInputText from "@/components/ui/FormControlInputText";
import { AddGroupForm } from "./addGroupFormWidget.types";
import { emailPattern } from "@/consts/pattern.consts";
import { useAuthContext } from "@/context/AuthContext";

import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Snackbar } from "@mui/material";
import { CloudUpload, Save } from "@mui/icons-material";
import {
  maxDescriptionLength,
  maxNameLength,
  minNameLength,
} from "./addGroupFormWidget.consts";
import { usePostData } from "@/hooks/usePostData";
import { useAddGroupFormWidget } from "./hooks/useAddGroupFormWidget";

const AddGroupFormWidget = () => {
  const {
    userData,
    methods,
    handleSubmit,
    handleOnSubmit,
    errors,
    isLoading,
    isValid,
  } = useAddGroupFormWidget();

  if (!userData) return <Spinner />;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <FormControlInputText
            name="name"
            placeholder="Name of the group"
            label="Name"
            required
            error={errors.name !== undefined}
            minLength={minNameLength}
            maxLength={maxNameLength}
            formHelperType="JUST_LENGTH"
          />

          <FormControlInputText
            name="description"
            placeholder="Description of the group"
            label="Description"
            required
            multiline
            rows={3}
            error={errors.description !== undefined}
            maxLength={maxDescriptionLength}
            formHelperType="JUST_LENGTH"
          />

          <FormControlInputText
            name="creatorId"
            placeholder="Coordinator email"
            label="anthony_company@google.com"
            pattern={emailPattern}
            disabled={userData.role === "COORDINATOR_ROLE"}
            required
            error={errors.creatorId !== undefined}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 1,
              paddingY: 3,
            }}
          >
            <Button
              variant="contained"
              startIcon={isLoading ? <CloudUpload /> : <Save />}
              disabled={!isValid || isLoading}
              type="submit"
            >
              {isLoading ? "Saving..." : "Add new group"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default AddGroupFormWidget;
