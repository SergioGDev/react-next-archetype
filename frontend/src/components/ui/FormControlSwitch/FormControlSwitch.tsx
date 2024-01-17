import React, { useEffect } from 'react';

import { FormControl, FormControlLabel, Switch } from '@mui/material';
import { UseFormReturn, useFormContext } from 'react-hook-form';

import { FormControlSwitchProps } from './formControlSwitch.types';

const FormControlSwitch = ({
  name,
  label,
  className,
  sx,
  color = 'secondary',
  disabled,
  defaultChecked,
  onMouseEnter,
  onChange,
  inputTestSelector,
}: FormControlSwitchProps) => {
  const { register, setValue, watch }: UseFormReturn = useFormContext();

  useEffect(() => {
    setValue(name, defaultChecked ?? false);
  }, [defaultChecked]);

  // Events
  const handleOnMouseEnter = (event?: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    event?.preventDefault();
    event?.stopPropagation();

    onMouseEnter?.(event);
  };

  // Events
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
    onChange?.(event);
  };

  return (
    <FormControl className={className} sx={sx} test-selector={inputTestSelector}>
      <FormControlLabel
        name={name}
        label={<span test-selector={`${inputTestSelector}-label`}>{label}</span>}
        control={
          <Switch
            color={color}
            disabled={disabled}
            checked={watch(name) ?? false}
            {...(register(name), { onChange: handleOnChange })}
            test-selector={`${inputTestSelector}-checkbox`}
            aria-checked={watch(name) ?? false}
          />
        }
        aria-checked={watch(name) ?? false}
        onMouseEnter={handleOnMouseEnter}
      />
    </FormControl>
  );
};

export default FormControlSwitch;
