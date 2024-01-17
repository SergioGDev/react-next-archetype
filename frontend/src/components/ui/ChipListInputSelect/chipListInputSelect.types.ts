import { ReactNode } from 'react';

import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import { ApiDatasetTypes, Language } from '@/models';

// Props for the component
export type ChipListInputSelectProps = {
  name: string;
  sx?: SxProps<Theme>;
  placeholder: string;
  label: string;
  error?: boolean;
  className?: string;
  variant?: VariantType;
  multiple?: boolean;
  testSelectorInput?: string;
  testSelectorOption?: string;
  options: ChipListInputSelectItemGroup[] | ChipListInputSelectItem[];
  defaultItemsSelected?: string[];
  formHelperText?: ReactNode;
  handleOnChangeInput: (values: ChipListInputSelectOption[]) => void;
  onMouseEnter?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export type VariantType = 'standard' | 'outlined' | 'filled';

export type ChipListInputSelectOption = {
  id: string;
  deep: DeepType;
  items: ChipListInputSelectItem[];
  title: string;
  description: string;
  type?: ApiDatasetTypes;
};

export type ChipListInputSelectItemGroup = {
  id: string;
  title: string;
  description: string;
  type: ApiDatasetTypes;
  items: ChipListInputSelectItem[];
};

export type ChipListInputSelectItem = {
  id: string;
  title: Language[];
  description: Language[];
};

export type DeepType = 0 | 1;
