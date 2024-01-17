import React, { ReactNode } from 'react';
import styles from './ChipListInputSelect.module.scss';

import { Language, PiScope } from '@/models';
import {
  ChipListInputSelectItem,
  ChipListInputSelectItemGroup,
  ChipListInputSelectOption,
} from './chipListInputSelect.types';
import { language, stylesGroupItemSelect, stylesItemSelect } from './chipListInputSelect.consts';
import {
  AutocompleteRenderGetTagProps,
  AutocompleteRenderInputParams,
  AutocompleteRenderOptionState,
  Box,
  Chip,
  IconButton,
  TextField,
  TextFieldVariants,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

export const getOptions = (
  options: ChipListInputSelectItem[] | ChipListInputSelectItemGroup[]
): ChipListInputSelectOption[] => {
  const allOptions: ChipListInputSelectOption[] = [];

  if (options.every((option) => 'items' in option)) {
    // ChipListInputSelectItemGroup
    (options as ChipListInputSelectItemGroup[]).forEach(({ id, description, items, title, type }) => {
      // First, we'll add the father item
      allOptions.push({
        id,
        deep: 0,
        description,
        title,
        items,
        type,
      });

      // After that, we'll add the ids in items list
      items.forEach(({ description, id, title }) => {
        allOptions.push({
          id,
          deep: 1,
          description: getLangValue(description),
          title: getLangValue(title),
          items: [{ id, description, title }],
        });
      });
    });
  } else {
    // ChipListInputSelectItem
    (options as ChipListInputSelectItem[]).forEach(({ description, id, title }) => {
      allOptions.push({
        id,
        deep: 0,
        description: getLangValue(description),
        title: getLangValue(title),
        items: [{ id, description, title }],
      });
    });
  }

  return allOptions;
};

// Functions
export const getLangValue = (item: Language[], lang_id = 'und') => {
  if (!Array.isArray(item) || item.length === 0) {
    return '';
  }

  const language = item.find((language) => language.lang_id === lang_id);

  if (language) {
    return language.value;
  }

  if (item[0].lang_id) {
    return item[0].value;
  } else {
    return '';
  }
};

export const renderChipOptions = (option: ChipListInputSelectOption) => {
  if (option.deep === 0) {
    if (option.type) {
      return (
        <>
          <span className={styles.typeLabel}>{option['type']}&nbsp;-&nbsp;</span>
          <small>{option['description']}</small>
        </>
      );
    }
    return <small>{option['description']}</small>;
  }
  return <span>{option['description']}</span>;
};

// Returns TRUE if shortString.trim().toLowerCase() is included in fullString.trim().toLowerCase();
export const stringCompare = (fullString = '', shortString = ''): boolean => {
  return fullString === '' || shortString === ''
    ? false
    : fullString.trim().toLocaleLowerCase().indexOf(shortString.trim().toLowerCase()) > -1;
};

export const getPiScopesFromChipListInputSelectOption = (vOptions: ChipListInputSelectOption[]) => {
  const piScopes: PiScope[] = [];

  vOptions.forEach(({ items, title, description }) => {
    if (items.length === 1) {
      piScopes.push({
        id: items[0].id,
        title: [{ lang_id: language, value: title }],
        description: [{ lang_id: language, value: description }],
      });
    }
  });

  return piScopes;
};

export const getIdsFromChipListInputSelectOption = (vOptions: ChipListInputSelectOption[]) => {
  const idsFromList: string[] = [];

  vOptions.forEach(({ items }) => {
    if (items.length === 1) {
      idsFromList.push(items[0].id);
    }
  });

  return idsFromList;
};

export const optionsHaveSublevels = (vOptions: ChipListInputSelectOption[]): boolean => {
  return vOptions.every(({ deep }) => deep === 0);
};

export const deleteTag = (index: number, itemsSelected: ChipListInputSelectOption[]) => {
  const items = [...itemsSelected];
  if (index === 0) items.shift();
  else items.splice(index, index);
  return items;
};

// Find the id into the items of the list
export const isIdInAllOptions = (myId: string, allOptions: ChipListInputSelectOption[]) => {
  for (const { items } of allOptions) {
    for (const { id } of items) {
      if (myId === id) {
        return true;
      }
    }
  }
  return false;
};

export const getFilteredOptions = (
  inputValue = '',
  allOptions: ChipListInputSelectOption[],
  selectableOptions: ChipListInputSelectOption[],
  itemsSelected: ChipListInputSelectOption[]
): ChipListInputSelectOption[] => {
  return inputValue.trim() === ''
    ? allOptions.filter((option) => !isAllOptionsSelected(option, itemsSelected))
    : filterByInputValue(inputValue, selectableOptions);
};

// Apply the inputValue to filter the list of selectables options
export const filterByInputValue = (
  inputValue: string,
  selectableOptions: ChipListInputSelectOption[]
): ChipListInputSelectOption[] => {
  const filteredOptions = selectableOptions.filter(({ id, title, description, type }: ChipListInputSelectOption) => {
    return (
      stringCompare(id, inputValue) ||
      stringCompare(title, inputValue) ||
      stringCompare(description, inputValue) ||
      stringCompare(type?.toString(), inputValue)
    );
  });
  return filteredOptions;
};

export const isAllOptionsSelected = (option: ChipListInputSelectOption, itemsSelected: ChipListInputSelectOption[]) => {
  return option.items.every((childItem) =>
    itemsSelected.some(
      (itemSelected) =>
        childItem.id === itemSelected.id &&
        getLangValue(childItem.title) === itemSelected.title &&
        getLangValue(childItem.description) === itemSelected.description
    )
  );
};

// RENDER FUNCTIONS //
export const renderInput = (
  params: AutocompleteRenderInputParams,
  label: string,
  error: boolean,
  placeholder: string,
  variant: TextFieldVariants,
  testSelectorInput: string
) => (
  <TextField
    {...params}
    label={label}
    error={error}
    placeholder={placeholder}
    variant={variant}
    test-selector={testSelectorInput}
  />
);

export const renderOption = (
  props: React.HTMLAttributes<HTMLLIElement>,
  option: ChipListInputSelectOption,
  { index }: AutocompleteRenderOptionState
) => (
  <li {...props} key={index}>
    <Box
      sx={option.deep === 0 ? stylesGroupItemSelect : stylesItemSelect}
      test-selector="chip-autocomplete-option"
      test-entity-id={option['id']}
    >
      <span className={styles.bold}>{option['title']}</span>
      <span>&nbsp;-&nbsp;</span>
      {renderChipOptions(option)}
    </Box>
  </li>
);

export const renderTags = (value: ChipListInputSelectOption[], getTagProps: AutocompleteRenderGetTagProps) => {
  const tags: ReactNode[] = [];
  value.forEach((val, index) => {
    const props = getTagProps({ index });
    const chip = (
      <Chip
        {...props}
        test-selector="chip-autocomplete-selected"
        test-entity-id={val.id}
        label={val.id}
        onDelete={(e) => props.onDelete(e)}
        deleteIcon={
          <IconButton test-selector="chip-autocomplete-remove" size="small">
            <CancelIcon fontSize="small" />
          </IconButton>
        }
      />
    );
    tags.push(chip);
  });
  return <div>{tags}</div>;
};
