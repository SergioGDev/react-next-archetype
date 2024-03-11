import React, { useEffect, useState } from "react";
import styles from "./EditUserDataWidget.module.scss";

import FormControlInputText from "@/components/ui/FormControlInputText";
import { EditUserForm } from "./editUserDataWidget.types";
import { useAuthContext } from "@/context/AuthContext";
import { maxNameLength, maxSurnameLength } from "./editUserDataWidget.consts";
import { AUTH_TOKEN } from "@/context/AuthContext/authContext.consts";

import { Box, Button, Card, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { UserData } from "@/context/AuthContext/authContext.types";
import { useSnackbarContext } from "@/context/SnackbarContext/SnackbarContextProvider";
import { RespData } from "@/types/axios.types";

const EditUserDataWidget = () => {
  const authToken = Cookies.get(AUTH_TOKEN);
  const { showSnackbar } = useSnackbarContext();
  const [loading, setLoading] = useState(false);
  const { userData, setUserData } = useAuthContext();
  const methods = useForm<EditUserForm>();
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = methods;

  useEffect(
    () => reset({ name: userData?.name, surname: userData?.surname }),
    [userData]
  );

  const onSubmit = async () => {
    const { name, surname } = watch();
    setLoading(true);
    const resp = await axios.post(
      "/api/auth/update-user-data",
      {
        email: userData?.email,
        name,
        surname,
      },
      {
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : "",
        },
      }
    );

    if (!resp) {
      showSnackbar("Error updating data");
      setLoading(false);
      return;
    }

    setUserData(resp.data.userData as UserData);
    showSnackbar("User data updated");
    setLoading(false);
  };

  return (
    <Card className={styles.container}>
      <Typography className={styles.title} variant="h5">
        Edit user data
      </Typography>
      <FormProvider {...methods}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControlInputText
            name="name"
            placeholder="Name"
            label="Name"
            defaultValue={userData?.name}
            required
            error={errors.name !== undefined}
            maxLength={maxNameLength}
            formHelperType="JUST_LENGTH"
          />

          <FormControlInputText
            name="surname"
            placeholder="Surname"
            label="Surname"
            defaultValue={userData?.surname}
            required
            error={errors.surname !== undefined}
            maxLength={maxSurnameLength}
            formHelperType="JUST_LENGTH"
          />

          <Box className={styles.buttonRow}>
            <Button disabled={!isValid || loading} type="submit">
              {loading ? "Loading..." : "Edit user data"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Card>
  );
};

export default EditUserDataWidget;
