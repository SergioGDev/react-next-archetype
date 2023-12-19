import React from 'react';
import styles from './{{ pascalCase name }}.module.scss';

import { {{ pascalCase name }}Props } from './{{ camelCase name }}.types';

export const {{ pascalCase name }} = ({ exampleProp }: {{ pascalCase name }}Props) => {
  return (
    <div className={styles.container}>{{ pascalCase name }} Component</div>
  );
};
