import React from 'react';
import styles from './Spinner.module.scss';
import { CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
