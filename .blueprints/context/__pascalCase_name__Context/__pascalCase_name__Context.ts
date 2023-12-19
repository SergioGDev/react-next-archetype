import { createContext } from 'react';

export type {{pascalCase name}}ContextType = {};

export type {{pascalCase name}}ContextProps = {
    {{pascalCase name}}ServiceState: {{pascalCase name}}ContextType;
    // Insert here the functions to modify state;
};

export const {{pascalCase name}}Context = createContext<{{pascalCase name}}ContextProps>({} as {{pascalCase name}}ContextProps);