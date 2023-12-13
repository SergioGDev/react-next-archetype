import React, { useContext } from 'react';
import styles from './ItemContainer.module.scss';

import { ItemContainerProps } from './itemContainer.types';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DataContext } from '@/context/DataContext';

const ItemContainer = ({ item }: ItemContainerProps) => {
  const { removeItem } = useContext(DataContext);
  return (
    <div className={styles.container}>
      <div>
        <span>{item.id}</span> - <span>{item.name}</span>
      </div>
      <div>
        <IconButton onClick={() => removeItem(item.id)}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default ItemContainer;