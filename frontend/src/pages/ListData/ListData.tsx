import React from 'react';
import styles from './ListData.module.scss';

import { ListDataProps } from './listData.types';
import InputAdd from './components/InputAdd';
import DataListContainer from './components/DataListContainer';

const ListData = () => {
  return (
    <div className={styles.container}>
      <InputAdd />
      <DataListContainer />
    </div>
  );
};

export default ListData;