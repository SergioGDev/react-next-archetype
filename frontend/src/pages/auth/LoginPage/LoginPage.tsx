import React from "react";
import styles from "./LoginPage.module.scss";

import AuthLayout from "../layout/AuthLayout/AuthLayout";
import { FormControlInputText } from "@/components/ui/FormControlInputText";
import { useAuthContext } from "@/context/AuthContext";
import { LoginForm } from "./loginPage.types";
import { emailPattern } from "@/consts/pattern.consts";

import { Box, Button, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";

const LoginPage = () => {
  const methods = useForm<LoginForm>();
  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { login, isLoading, errorLoading } = useAuthContext();

  const handleOnSubmit = () => {
    const { email, password } = watch();
    login(email, password);
  };

  return (
    <AuthLayout titlePage="Login">
      <FormProvider {...methods}>
        <form
          className={styles.loginForm}
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

          <Box className={styles.goToRegisterUserBox}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href={"/register"}>Click here to register</Link>
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
            Login
          </Button>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default LoginPage;
