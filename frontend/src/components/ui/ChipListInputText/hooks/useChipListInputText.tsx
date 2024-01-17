import React, { useEffect, useState } from 'react';
import { UseChipListInputTextProps } from '../chipListInputText.types';
import { useFormContext } from 'react-hook-form';
import { useListDataValueSetter } from './useListDataValueSetter';
import { isValidate } from '../chipListInputText.helpers';

export const useChipListInputText = ({
  name,
  pattern,
  setInputValue,
  onChange,
  onBlur,
  onMouseEnter,
  required,
}: UseChipListInputTextProps) => {
  const { setValue, watch, setError, clearErrors, trigger } = useFormContext();
  const { setEventValueToListData } = useListDataValueSetter(name, setInputValue);

  useEffect(() => {
    if (watch(name) === undefined) {
      setValue(name, []);
    }
  }, []);

  useEffect(() => {
    if (required && watch(name)) {
      if (watch(name).length > 0) {
        clearErrors(name);
      } else {
        setError(name, { type: 'required' });
      }
      trigger(name);
    }
  }, [watch(name)?.length]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // If key pressed is 'Enter', add the uri to the list
    if (event.key === 'Enter') {
      event.preventDefault();
      setEventValueToListData(event);
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    onChange && onChange(event);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setEventValueToListData(event);
    onBlur && onBlur(event);
  };

  const handleOnMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onMouseEnter && onMouseEnter(event);
  };

  const handleOnDeleteChip = (index: number) => {
    const vData: string[] = watch(name);
    vData.splice(index, 1);
    setValue(name, vData);
    // Check all items on the list
    if (pattern) {
      vData.every((item: string) => isValidate(item))
        ? clearErrors(name)
        : setError(name, {
            type: 'item-without-correct-pattern',
          });
    }
    trigger(name);
  };

  return { handleOnKeyDown, handleOnChange, handleOnBlur, handleOnDeleteChip, handleOnMouseEnter, watch };
};
