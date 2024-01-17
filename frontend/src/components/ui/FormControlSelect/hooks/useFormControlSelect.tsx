import React, { useMemo } from 'react';
import styles from '../FormControlSelect.module.scss';

import { FormControlSelectItemList, FormControlSelectProps } from '../formControlSelect.types';
import { useFormContext } from 'react-hook-form';
import { Chip, SelectChangeEvent } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/ban-types
export const useFormControlSelect = <T extends Object>({
  name,
  onChange,
  onMouseEnter,
  multipleSelectRenderType,
  itemList,
  defaultValue,
}: FormControlSelectProps<T>) => {
  const { register, control, setValue, trigger, watch } = useFormContext();
  const defaultValueMemo = useMemo(() => {
    const value = watch(name);
    return value ? value : defaultValue ? defaultValue : '';
  }, []);

  // Events
  const handleOnChange = (event: SelectChangeEvent<T | T[]>) => {
    setValue(name, event.target.value);
    trigger(name);
    onChange && onChange(event);
  };

  const handleOnMouseEnter = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.preventDefault();
    event?.stopPropagation();

    onMouseEnter && onMouseEnter(event);
  };

  const handleOnDeleteChip = (value: T) => {
    if (Array.isArray(watch(name))) {
      const vValues = watch(name).filter((item: T) => item !== value);

      setValue(name, vValues);
      trigger(name);
    }
  };

  const isValueSelected = (value: T): boolean => {
    return watch(name) && Array.isArray(watch(name)) ? watch(name).indexOf(value) > -1 : false;
  };

  const renderMultipleSelect = (selected: T[]) => {
    if (multipleSelectRenderType === undefined || multipleSelectRenderType === 'string') {
      const listFiltered = itemList.filter((item) => selected.includes(item.value)).map((item) => item.label);
      return listFiltered.join(', ');
    } else if (multipleSelectRenderType === 'chip') {
      const listFiltered = itemList.filter((item) => watch(name).includes(item.value));

      return listFiltered.map(({ key, label, value }) => (
        <Chip
          key={key}
          label={label}
          className={styles.chipSelect}
          onDelete={() => handleOnDeleteChip(value)}
          onMouseDown={(event) => event.stopPropagation()} // To prevent the select from opening
        />
      ));
    }

    const listFiltered = itemList.filter((item) => selected.includes(item.value)).map((item) => item.label);
    return listFiltered.join(', ');
  };

  const renderItemSelected = (selected: T) => {
    return itemList.find((item: FormControlSelectItemList<T>) => item.value === selected)?.label;
  };

  return {
    defaultValueMemo,
    register,
    control,
    setValue,
    trigger,
    watch,
    handleOnChange,
    handleOnMouseEnter,
    handleOnDeleteChip,
    isValueSelected,
    renderMultipleSelect,
    renderItemSelected,
  };
};
