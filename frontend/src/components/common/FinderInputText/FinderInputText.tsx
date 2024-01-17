import React from 'react';
import styles from './FinderInputText.module.scss';

import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { Close } from '@mui/icons-material';
import { FinderInputTextProps } from './finderInputText.types';

const FinderInputText = ({
  label,
  placeholder,
  filterValue,
  handleFilterChange,
  handleClearFilterValue,
}: FinderInputTextProps) => {
  return (
    <FormControl variant="standard" className={styles.listFilterContainer}>
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <Input
        test-selector="list-filter"
        id="outlined-adornment-password"
        color="primary"
        type="text"
        value={filterValue}
        placeholder={placeholder}
        onChange={handleFilterChange}
        endAdornment={
          <InputAdornment position="end" sx={{ display: filterValue === '' ? 'none' : '' }}>
            <IconButton
              aria-label="Clear filter value"
              onClick={handleClearFilterValue}
              edge="end"
              test-selector="list-filter-clean"
            >
              <Close />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default FinderInputText;
