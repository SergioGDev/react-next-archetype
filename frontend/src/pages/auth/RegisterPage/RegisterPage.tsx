import React from "react";
import styles from "./RegisterPage.module.scss";

import AuthLayout from "../layout/AuthLayout";
import { RegisterForm } from "./registerPage.types";
import { emailPattern } from "@/consts/pattern.consts";
import { useAuthContext } from "@/context/AuthContext";
import { FormControlInputText } from "@/components/ui/FormControlInputText";

import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import FormControlSelect from "@/components/ui/FormControlSelect";
import { getRolesItemList } from "./registerPage.helper";

const RegisterPage = () => {
  const methods = useForm<RegisterForm>();
  const { watch, handleSubmit } = methods;
  const { registerUser, isLoading, errorLoading } = useAuthContext();

  const handleOnSubmit = () => {
    const { email, password } = watch();
    // login(email, password);
  };

  return (
    <AuthLayout titlePage="Register">
      <FormProvider {...methods}>
        <form
          className={styles.registerForm}
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <FormControlInputText
            name="email"
            placeholder="email@google.com"
            pattern={emailPattern}
            label="Email"
            required
          />

          <FormControlInputText
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
            required
          />

          <FormControlInputText
            name="name"
            placeholder="Tell us your name..."
            label="Name"
            type="text"
            required
          />

          <FormControlInputText
            name="surname"
            placeholder="Tell us your surname..."
            label="Surname"
            type="text"
            required
          />

          <FormControlSelect
            name="role"
            placeholder="Type of user..."
            label="Type of user"
            required
            itemList={getRolesItemList()}
          />

          <Box className={styles.goToLoginUserBox}>
            <Typography variant="body2">
              Do you have an account?{" "}
              <Link href={"/login"}>Click here to login</Link>
            </Typography>
          </Box>

          <Box className={styles.errorMsgBox}>
            <Typography variant="body2" className={styles.errorMsg}>
              {errorLoading?.msg}
            </Typography>
          </Box>

          <Button
            color="primary"
            variant="outlined"
            disabled={isLoading}
            type="submit"
          >
            Register User
          </Button>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default RegisterPage;
