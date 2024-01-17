import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

// Props for the component
export type FormControlSwitchProps = {
  name: string;
  label: string;
  className?: string;
  sx?: SxProps<Theme>;
  color?: 'error' | 'secondary' | 'default' | 'primary' | 'info' | 'success' | 'warning' | undefined;
  defaultChecked?: boolean | undefined;
  onMouseEnter?: (event?: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void | undefined;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  inputTestSelector?: string;
};
