export type FinderInputTextProps = {
  label: string;
  placeholder: string;
  filterValue: string;
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearFilterValue: () => void;
};
