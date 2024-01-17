/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import styles from "./FormControlSelect.module.scss";

import {
  FormControlSelectItemList,
  FormControlSelectProps,
} from "./formControlSelect.types";

import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { MenuProps } from "./formControlSelect.consts";
import { useFormControlSelect } from "./hooks/useFormControlSelect";

const FormControlSelect = <T extends Object>(
  props: FormControlSelectProps<T>
) => {
  const {
    defaultValueMemo,
    register,
    control,
    trigger,
    handleOnChange,
    handleOnMouseEnter,
    isValueSelected,
    renderMultipleSelect,
    renderItemSelected,
  } = useFormControlSelect(props);

  const {
    name,
    label,
    sx,
    className,
    placeholder,
    itemList,
    multiple = false,
    error,
    disabled,
    required,
    inputTestSelector,
    itemListTestSelector,
    formHelper,
    formHelperTestSelector,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValueMemo}
      render={({ field }) => (
        <FormControl
          variant="standard"
          error={error}
          sx={{ ...sx, width: "100%" }}
          className={className}
        >
          {label && <InputLabel required={required}>{label}</InputLabel>}
          <Select
            {...field}
            className={styles.multipleSelect}
            placeholder={placeholder}
            multiple={multiple}
            onMouseEnter={handleOnMouseEnter}
            test-selector={inputTestSelector}
            disabled={disabled}
            renderValue={(selected: T | T[]) =>
              Array.isArray(selected) ? (
                renderMultipleSelect(selected)
              ) : (
                <>{renderItemSelected(selected)}</>
              )
            }
            {...register(name, {
              required: required,
              onChange: (event) => handleOnChange(event),
              onBlur: () => trigger(name),
            })}
            onClose={() => trigger(name)}
            MenuProps={MenuProps}
          >
            {itemList.map(
              ({ key, value, label }: FormControlSelectItemList<any>) => (
                <MenuItem
                  key={key}
                  value={value}
                  test-selector={itemListTestSelector}
                  test-entity-id={value}
                >
                  {!!multiple && <Checkbox checked={isValueSelected(value)} />}
                  {label}
                </MenuItem>
              )
            )}
          </Select>
          <FormHelperText component={"div"}>
            <div test-selector={formHelperTestSelector}>
              {formHelper ? formHelper : <span>&nbsp;</span>}
            </div>
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormControlSelect;
