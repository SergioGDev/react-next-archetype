import React from 'react';

import { ChipListInputSelectProps } from './chipListInputSelect.types';
import { Autocomplete, FormControl, FormHelperText } from '@mui/material';
import { deepCompare } from '@/utils/deep-compare';
import { useChipListInputSelect } from './hooks/useChipListInputSelect';
import { renderInput, renderOption, renderTags, getFilteredOptions } from './chipListInputSelect.helpers';

const ChipListInputSelect = (props: ChipListInputSelectProps) => {
  const { name, sx, className, variant = 'outlined', formHelperText = <>&nbsp;</> } = props;
  const { allOptions, selectableOptions, itemsSelected, handleOnMouseEnter, handleOnChangeAutocomplete } =
    useChipListInputSelect(props);

  return (
    <FormControl variant={variant} fullWidth sx={sx} className={className} test-selector="chip-autocomplete-list">
      <Autocomplete
        id={`allOptions-${name}`}
        test-selector="chip-autocomplete-input"
        options={selectableOptions}
        value={itemsSelected}
        onChange={handleOnChangeAutocomplete}
        onMouseEnter={handleOnMouseEnter}
        disableCloseOnSelect
        disablePortal
        multiple
        getOptionLabel={({ items }) => (items.length === 1 ? items[0].id : '')}
        renderOption={(props, option, state) => {
          return renderOption(props, option, state);
        }}
        renderInput={(params) =>
          renderInput(
            params,
            props.label,
            props.error ?? false,
            props.placeholder,
            props.variant ?? 'standard',
            props.testSelectorInput ?? ''
          )
        }
        renderTags={(value, getTagProps) => renderTags(value, getTagProps)}
        filterSelectedOptions
        filterOptions={(options, { inputValue }) =>
          getFilteredOptions(inputValue, allOptions, selectableOptions, itemsSelected)
        }
        isOptionEqualToValue={(option, value) => deepCompare(option, value)}
      />
      <FormHelperText>{formHelperText}</FormHelperText>
    </FormControl>
  );
};

export default ChipListInputSelect;
