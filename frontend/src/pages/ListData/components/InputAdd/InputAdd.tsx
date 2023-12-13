import React, { useContext } from "react";
import styles from "./InputAdd.module.scss";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ItemForm } from "./inputAdd.types";
import { FormControlInputText } from "@/components/ui/FormControlInputText";
import { Box, Button } from "@mui/material";
import { DataContext } from "@/context/DataContext";

const InputAdd = () => {
  const formMethods = useForm<ItemForm>();
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;
  const { addItem } = useContext(DataContext);

  const onSubmit: SubmitHandler<ItemForm> = (data: ItemForm) => {
    addItem(data);
    reset();
  };

  return (
    <div className={styles.container}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <FormControlInputText
              name="id"
              label="ID"
              type="number"
              sx={{ flexGrow: 1 }}
              required
            />
            <FormControlInputText
              name="name"
              label="Nombre"
              sx={{ flexGrow: 5 }}
              required
            />
          </Box>

          <Box sx={{ width: "100%", textAlign: "end" }}>
            <Button variant="contained" disabled={!isValid} type="submit">
              Añadir
            </Button>
          </Box>
        </form>
      </FormProvider>
    </div>
  );
};

export default InputAdd;
