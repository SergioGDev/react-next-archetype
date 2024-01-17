import React from 'react';

import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { FormControlRadioGroupProps } from './formControlRadioGroup.types';

// eslint-disable-next-line @typescript-eslint/ban-types
const FormControlRadioGroup = <T extends Object>({
  name,
  label,
  defaultSelected,
  itemList,
  onChange,
  onMouseEnter,
  required,
  inputTestSelector,
}: FormControlRadioGroupProps<T>) => {
  const { watch, control } = useFormContext();

  const handleOnMouseEnter = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.preventDefault();
    event?.stopPropagation();

    onMouseEnter && onMouseEnter(event);
  };

  return (
    <div className="baikal-radio-group">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultSelected ?? ''}
        rules={{ required: required }}
        render={({ field }) => (
          <FormControl fullWidth>
            {label && (
              <FormLabel required={required} sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                {label}
              </FormLabel>
            )}
            <RadioGroup
              {...field}
              sx={{ flexDirection: 'row' }}
              onChange={(event, value) => {
                field.onChange(value);
                onChange && onChange(event);
              }}
              onMouseEnter={(event) => handleOnMouseEnter(event)}
              value={field.value}
              test-selector={inputTestSelector}
            >
              {itemList.map(({ value, label }, index) => (
                <FormControlLabel
                  key={`${index}-${value}`}
                  value={value}
                  label={label}
                  checked={watch(name) === value}
                  control={<Radio test-selector={`${inputTestSelector}-option`} color="secondary" />}
                  test-selector={`value-${value}`}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
    </div>
  );
};

export default FormControlRadioGroup;
