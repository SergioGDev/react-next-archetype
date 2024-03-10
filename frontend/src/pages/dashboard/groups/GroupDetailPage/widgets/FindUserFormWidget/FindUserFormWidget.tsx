import React from "react";
import styles from "./FindUserFormWidget.module.scss";
import FormControlInputText from "@/components/ui/FormControlInputText";
import { emailPattern } from "@/consts/pattern.consts";
import { useFindUserFormWidget } from "./hooks/useFindUserFormWidget";

import { Button } from "@mui/material";
import { FormProvider } from "react-hook-form";
import { FindUserFormWidgetProps } from "./findUserFormWidget.types";
import { useGroupDetailContext } from "../../context/GroupDetailContext/GroupDetailContextProvider";

const FindUserFormWidget = () => {
  const { loadingFindUsers } = useGroupDetailContext();
  const { handleOnSubmit, methods } = useFindUserFormWidget();

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={styles.formContainer}
      >
        <FormControlInputText
          name="userEmail"
          placeholder="user_email@example.com"
          label="Email of the user"
          pattern={emailPattern}
          required
        />

        <Button
          color="primary"
          variant="outlined"
          className={styles.submitButton}
          disabled={!isValid || loadingFindUsers}
          type="submit"
        >
          {loadingFindUsers ? "Loading..." : "Find users"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default FindUserFormWidget;
