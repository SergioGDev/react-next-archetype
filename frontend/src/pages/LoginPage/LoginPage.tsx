import React from "react";
import styles from "./LoginPage.module.scss";

import { FormControlInputText } from "@/components/ui/FormControlInputText";

import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { useAuthContext } from "@/context/AuthContext";
import { LoginForm } from "./loginPage.types";
import { emailPattern } from "./loginPage.consts";

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
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <Typography variant="h5" sx={{ marginBottom: 5, marginTop: 1 }}>
          Login Page
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <FormControlInputText
              name="email"
              placeholder="email@jociles.com"
              error={errors.email !== undefined}
              pattern={emailPattern}
              label="Email"
              required
              sx={{ width: "100%" }}
            />

            <FormControlInputText
              name="password"
              placeholder="Password"
              label="Password"
              error={errors.password !== undefined}
              type="password"
              required
              sx={{ width: "100%" }}
            />

            <Box sx={{ width: "100%", height: "22px", textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#cd1a1a" }}>
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
      </div>
    </div>
  );
};

export default LoginPage;
