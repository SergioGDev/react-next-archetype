import React from 'react';
import { useFormContext } from 'react-hook-form';
import { isValidate } from '../chipListInputText.helpers';

export const useListDataValueSetter = (name: string, setInputValue: (value: string) => void) => {
  const { setValue, watch, setError, trigger } = useFormContext();
  // It takes the value from event and, if is not undefined, sets the value to the form data
  const setEventValueToListData = (
    event: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const value = (event.target as HTMLInputElement).value;
    if (value?.trim() !== '') {
      const vWatch = watch(name) ?? [];
      const vData = [...vWatch, value.trim()];
      !isValidate(value.trim()) &&
        setError(name, {
          type: 'item-without-correct-pattern',
        }); // Check if it's a validate value
      setInputValue(''); // Reset the input text value d
      setValue(name, vData);
      trigger(name);
    }
  };

  return { setEventValueToListData };
};
