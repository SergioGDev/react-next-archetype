import React from 'react';
import styles from './AuthLayout.module.scss';
import { AuthLayoutProps } from './authLayout.types';
import { Typography } from '@mui/material';

const AuthLayout = ({ titlePage, children }: AuthLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.layoutContainer}>
        <Typography variant="h5" sx={{ marginBottom: 3, marginTop: 1 }}>
          { titlePage }
        </Typography>

        {children}
       
      </div>
    </div>
  );
};

export default AuthLayout;