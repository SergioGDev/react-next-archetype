import { ReactNode } from 'react';

export type ChipListInputTextProps = {
  name: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  testSelector?: string;
  required?: boolean;
  pattern?: RegExp;
  type?: 'text' | 'number';
  formHelperText?: ReactNode;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  variant?: 'standard' | 'outlined' | 'filled';
};

export type UseChipListInputTextProps = ChipListInputTextProps & {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};
