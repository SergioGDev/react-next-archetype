import React, { useState } from 'react';
import styles from './ChipListInputText.module.scss';

import { Chip, FormControl, FormHelperText, InputLabel, TextField } from '@mui/material';

import { ChipListInputTextProps } from './chipListInputText.types';
import { useChipListInputText } from './hooks/useChipListInputText';

const ChipListInputText = ({
  name,
  label,
  placeholder,
  pattern,
  error,
  required,
  formHelperText = <></>,
  onMouseEnter,
  onChange,
  onBlur,
  testSelector,
  type = 'text',
  variant = 'standard',
}: ChipListInputTextProps) => {
  const [inputValue, setInputValue] = useState('');

  // Events
  const { handleOnKeyDown, handleOnChange, handleOnBlur, handleOnDeleteChip, handleOnMouseEnter, watch } =
    useChipListInputText({
      onBlur,
      onMouseEnter,
      onChange,
      pattern,
      name,
      setInputValue,
      required,
    });

  return (
    <FormControl variant={variant} error={error} fullWidth>
      <TextField
        label={`${label} ${required ? '*' : ''}`}
        name={name}
        placeholder={placeholder}
        type={type}
        variant={variant}
        error={error}
        value={inputValue}
        InputProps={{
          startAdornment:
            watch(name)?.length > 0 ? (
              <div className={styles.chipsContainer}>
                {watch(name).map((data: string, index: number) => (
                  <Chip
                    key={index}
                    label={data}
                    onDelete={() => handleOnDeleteChip(index)}
                    test-selector={`${testSelector}-chip`}
                    test-entity-id={data}
                  />
                ))}
              </div>
            ) : (
              []
            ),
        }}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        onMouseEnter={handleOnMouseEnter}
        test-selector={testSelector}
      />
      <FormHelperText> {formHelperText ? formHelperText : <>&nbsp;</>} </FormHelperText>
    </FormControl>
  );
};

export default ChipListInputText;
