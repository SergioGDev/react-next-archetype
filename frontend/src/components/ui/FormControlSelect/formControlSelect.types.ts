import { SelectChangeEvent, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

// Props for the component
export type FormControlSelectProps<T> = {
  name: string;
  label?: string;
  placeholder?: string;
  sx?: SxProps<Theme>;
  className?: string;
  multiple?: boolean;
  multipleSelectRenderType?: FormControlSelectType;
  defaultValue?: T | T[];
  disabled?: boolean;
  itemList: FormControlSelectItemList<T>[];
  error?: boolean;
  required?: boolean;
  onChange?: (event?: SelectChangeEvent<T | T[]>) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  inputTestSelector?: string;
  itemListTestSelector?: string;
  formHelper?: ReactNode;
  formHelperTestSelector?: string;
};

export type FormControlSelectItemList<T> = {
  label: string;
  key: string;
  value: T;
};

type FormControlSelectType = 'string' | 'chip';
