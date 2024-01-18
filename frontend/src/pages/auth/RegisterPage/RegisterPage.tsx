import React from "react";
import styles from "./RegisterPage.module.scss";

import AuthLayout from "../layout/AuthLayout";
import FormControlInputText from "@/components/ui/FormControlInputText";
import FormControlSelect from "@/components/ui/FormControlSelect";
import { RegisterForm } from "./registerPage.types";
import { emailPattern } from "@/consts/pattern.consts";
import { useAuthContext } from "@/context/AuthContext";
import { getRolesItemList } from "./registerPage.helper";

import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { UserData } from "@/context/AuthContext/authContext.types";

const RegisterPage = () => {
  const methods = useForm<RegisterForm>();
  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { registerUser, isLoading, errorLoading } = useAuthContext();

  const handleOnSubmit = () => {
    const { email, password, name, surname, role } = watch();
    const userData: UserData = { email, name, surname, password, role };
    registerUser(userData);
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
            error={errors.email !== undefined}
            label="Email"
            required
          />

          <FormControlInputText
            name="password"
            placeholder="Password"
            label="Password"
            type="password"
            error={errors.password !== undefined}
            required
            minLength={6}
          />

          <FormControlInputText
            name="name"
            placeholder="Tell us your name..."
            label="Name"
            type="text"
            error={errors.name !== undefined}
            required
          />

          <FormControlInputText
            name="surname"
            placeholder="Tell us your surname..."
            label="Surname"
            type="text"
            error={errors.surname !== undefined}
            required
            />

          <FormControlSelect
            name="role"
            placeholder="Type of user..."
            label="Type of user"
            error={errors.role !== undefined}
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
