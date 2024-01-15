import styles from "./LoginPage.module.scss";

import { FormControlInputText } from "@/components/ui/FormControlInputText";
import { useAuthContext } from "@/context/AuthContext";

import { Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

export const LoginPage = () => {
  const methods = useForm();
  const { watch } = methods;
  const { login, isLoading } = useAuthContext();

  const handleOnSubmit = () => {
    const { email, password } = watch();
    login(email, password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2>Login Page</h2>

        <FormProvider {...methods}>
          <form onSubmit={() => handleOnSubmit()}>
            <FormControlInputText
              name="email"
              placeholder="ejemplo@jociles.com"
              label="Correo electrónico"
              required
              sx={{ width: "100%" }}
            />

            <FormControlInputText
              name="password"
              placeholder="Contraseña..."
              label="Contraseña"
              type="password"
              required
              sx={{ width: "100%" }}
            />

            <Button
              color="primary"
              variant="outlined"
              disabled={ isLoading }
              type="button"
              onClick={() => handleOnSubmit()}
            >
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
