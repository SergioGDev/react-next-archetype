/* eslint-disable @typescript-eslint/ban-types */
// Props for the component
export type FormControlRadioGroupProps<T extends Object> = {
  name: string;
  label?: string;
  defaultSelected?: T;
  required?: boolean;
  itemList: FormControlRadioItem<T>[];
  onChange?: (event?: any) => void | undefined;
  onMouseEnter?: (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  inputTestSelector?: string;
};

export type FormControlRadioItem<T extends Object> = {
  value: T;
  label: string;
};
