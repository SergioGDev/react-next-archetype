import { ReactNode } from 'react';
import { SvgIconProps, SxProps, Theme } from '@mui/material';

// Props for the component
export type FormControlInputTextProps = {
  name: string;
  className?: string;
  sx?: SxProps<Theme>;
  label?: string;
  placeholder?: string;
  type?: FormControlInputTextType;
  defaultValue?: string | number;
  readOnly?: boolean;
  error?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: string | number;
  minRows?: string | number;
  maxRows?: string | number;
  shrink?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  EndAdornmentIcon?: React.ElementType<SvgIconProps>;
  endAdornmentTestSelector?: string;
  endAdornmentOnClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  inputTestSelector?: string;
  formHelperType?: FormHelperType;
  formHelperLeft?: ReactNode;
  formHelperRightTestSelector?: string;
  formHelperRight?: ReactNode;
  formHelperLeftTestSelector?: string;
};

type FormControlInputTextType = 'text' | 'number' | 'url' | 'password';
type FormHelperType = 'JUST_DESCRIPTION' | 'JUST_LENGTH' | 'DESCRIPTION_AND_LENGTH' | 'TWO_DESCRIPTIONS';
