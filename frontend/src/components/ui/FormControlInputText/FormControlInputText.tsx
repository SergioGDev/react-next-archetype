import React, { useEffect, useState } from 'react';
import styles from './FormControlInputText.module.scss';

import { FormControlInputTextProps } from './formControlInputText.types';

import { FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormContext } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/ban-types
const FormControlInputText = ({
  label,
  className,
  sx,
  placeholder,
  type = 'text',
  readOnly,
  error,
  shrink,
  required,
  multiline,
  rows,
  minRows,
  maxRows,
  minLength,
  maxLength,
  min,
  max,
  pattern,
  inputTestSelector,
  defaultValue,
  name,
  onChange,
  onBlur,
  onMouseEnter,
  EndAdornmentIcon,
  endAdornmentTestSelector,
  endAdornmentOnClick,
  formHelperType,
  formHelperLeft,
  formHelperLeftTestSelector,
  formHelperRight,
  formHelperRightTestSelector,
}: FormControlInputTextProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { register, setValue, trigger, watch } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue(name, defaultValue);
    }
  }, []);

  // Events
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    trigger(name);
    onChange?.(event);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    trigger(name);
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleOnMouseEnter = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.preventDefault();
    event?.stopPropagation();

    onMouseEnter?.(event);
  };

  // EndAdornments components
  const PasswordAdornment = (
    <InputAdornment position="end">
      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" test-selector={endAdornmentTestSelector}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  const EndAdornment = EndAdornmentIcon && (
    <InputAdornment position="end">
      <IconButton onClick={endAdornmentOnClick} edge="end" test-selector={endAdornmentTestSelector}>
        <EndAdornmentIcon />
      </IconButton>
    </InputAdornment>
  );

  return (
    <FormControl variant="standard" error={error} className={className} sx={{ ...sx, display: 'block' }}>
      {label && (
        <InputLabel shrink={shrink || isFocused || watch(name)?.toString().trim().length > 0} required={required}>
          {label}
        </InputLabel>
      )}
      <Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        multiline={multiline}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        onFocus={() => setIsFocused(true)}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        {...register(name, {
          required: required,
          minLength: minLength,
          maxLength: maxLength,
          min: min,
          max: max,
          pattern,
          onChange: (event) => handleOnChange(event),
          onBlur: (event) => handleOnBlur(event),
        })}
        inputProps={{ minLength, maxLength }}
        onMouseEnter={(event) => handleOnMouseEnter(event)}
        test-selector={inputTestSelector}
        endAdornment={type === 'password' ? PasswordAdornment : EndAdornment}
        sx={{ width: '100%' }}
      />
      <FormHelperText component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {formHelperType ? (
          <div test-selector={formHelperLeftTestSelector}>{formHelperLeft ?? <span>&nbsp;</span>}</div>
        ) : (
          <div>&nbsp;</div>
        )}
        {(formHelperType === 'DESCRIPTION_AND_LENGTH' || formHelperType === 'JUST_LENGTH') && (
          <div className={styles.wordsCounter} test-selector={formHelperRightTestSelector}>
            {watch(name) ? watch(name).length : 0} / {minLength ? `${minLength} - ` : ''} {maxLength ?? 0}
          </div>
        )}
        {formHelperType === 'TWO_DESCRIPTIONS' && (
          <div test-selector={formHelperRightTestSelector}>{formHelperRight}</div>
        )}
      </FormHelperText>
    </FormControl>
  );
};

export default FormControlInputText;
