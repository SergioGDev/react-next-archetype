import { SxProps, Theme } from '@mui/material';
import { PropsWithChildren } from 'react';

export type ExpansionPanelWithSwitchProps = PropsWithChildren<{
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  switchName: string;
  switchLabel: string;
  switchTestSelector?: string;
  accordionTestSelector?: string;
  handleOnChangeEnableSwitch?: (enableState: boolean, ...arg: any[]) => void;
  sx?: SxProps<Theme> | undefined;
  disabled?: boolean;
  defaultEnabled?: boolean;
}>;
