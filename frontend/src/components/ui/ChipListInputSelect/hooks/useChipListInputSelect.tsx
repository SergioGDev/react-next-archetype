import React, { useEffect, useState } from 'react';

import { ChipListInputSelectProps, ChipListInputSelectOption } from '../chipListInputSelect.types';
import { getLangValue, getOptions, isIdInAllOptions } from '../chipListInputSelect.helpers';
import { language } from '../chipListInputSelect.consts';

export const useChipListInputSelect = ({
  defaultItemsSelected = [],
  onMouseEnter,
  options,
  multiple = false,
  handleOnChangeInput,
}: ChipListInputSelectProps) => {
  const allOptions: ChipListInputSelectOption[] = getOptions(options);
  const [selectableOptions, setSelectableOptions] = useState<ChipListInputSelectOption[]>([]);
  const [itemsSelected, setItemsSelected] = useState<ChipListInputSelectOption[]>([]);
  const [itemsOutsideListOptions, setItemsOutsideListOptions] = useState<ChipListInputSelectOption[]>([]);

  // HOOKS //
  useEffect(
    // Update the selectable options
    () => setSelectableOptions(allOptions.filter((option) => isAllOptionsSelected(option) === false)),
    [itemsSelected.length]
  );
  useEffect(() => {
    const vSelectedItems: ChipListInputSelectOption[] = [];

    defaultItemsSelected.forEach((defaultItem: string) => {
      if (isIdInAllOptions(defaultItem, allOptions)) {
        const optionToAdd = allOptions.find(
          (option) => option.items.length === 1 && option.items[0].id === defaultItem
        );
        if (optionToAdd) vSelectedItems.push(optionToAdd);
      } else {
        const newItem: ChipListInputSelectOption = {
          id: defaultItem,
          title: '',
          description: '',
          deep: 0,
          items: [
            {
              id: defaultItem,
              title: [{ lang_id: language, value: '' }],
              description: [{ lang_id: language, value: '' }],
            },
          ],
        };
        vSelectedItems.push(newItem);
        setItemsOutsideListOptions((prev) => [...prev, newItem]);
      }
    });

    setItemsSelected(vSelectedItems);
    handleOnChangeInput(vSelectedItems);
  }, [defaultItemsSelected.length]);

  // FUNCTIONS //
  // Apply the inputValue to filter the list of selectables options
  const isAllOptionsSelected = (option: ChipListInputSelectOption) => {
    return option.items.every((childItem) =>
      itemsSelected.some(
        (itemSelected) =>
          childItem.id === itemSelected.id &&
          getLangValue(childItem.title) === itemSelected.title &&
          getLangValue(childItem.description) === itemSelected.description
      )
    );
  };

  // EVENTS //
  const handleOnMouseEnter = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event?.preventDefault();
    event?.stopPropagation();

    onMouseEnter && onMouseEnter(event);
  };

  const handleOnChangeAutocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    values: ChipListInputSelectOption[]
  ) => {
    let newItemsInsideListOptions: ChipListInputSelectOption[] = [];
    const newItemsOutsideListOptions: ChipListInputSelectOption[] = [];

    values.forEach((option: ChipListInputSelectOption) => {
      if (itemsOutsideListOptions.indexOf(option) !== -1) {
        newItemsOutsideListOptions.push(option);
      } else {
        option.items.forEach((item) => {
          const optionToPush = allOptions.find(
            ({ id, description, title }) =>
              id === item.id && description === getLangValue(item.description) && title === getLangValue(item.title)
          );
          // Pushed the option only if it's not on the selected items list
          optionToPush &&
            newItemsInsideListOptions.indexOf(optionToPush) === -1 &&
            newItemsInsideListOptions.push(optionToPush);
        });
      }
    });

    if (!multiple) {
      newItemsInsideListOptions = newItemsInsideListOptions.filter((item) => !itemsSelected.includes(item));
    }

    const newItemsSelected = [...newItemsOutsideListOptions, ...newItemsInsideListOptions];
    setItemsOutsideListOptions(newItemsOutsideListOptions);
    setItemsSelected(newItemsSelected);
    handleOnChangeInput(newItemsSelected);
  };

  return {
    handleOnChangeAutocomplete,
    handleOnMouseEnter,
    itemsSelected,
    selectableOptions,
    allOptions,
  };
};
