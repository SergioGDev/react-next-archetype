import { {{pascalCase name}}ContextType } from './{{camelCase name}}Context.types';

type {{pascalCase name}}Action = { type: 'exampleActionA'; payload: {{pascalCase name}}ContextType } | { type: 'exampleActionB' };

export const {{pascalCase name}}ContextReducer = (
        state: {{pascalCase name}}ContextType, 
        action: {{pascalCase name}}Action
    ): {{pascalCase name}}ContextType => {
    switch (action.type) {
        case 'exampleActionA':
            // Put here the new state after the action
            return { ...state, ...action.payload };
            
        case 'exampleActionB':
            // Put here the new state after the action
            return { ...state };

        default:
            return state;
  }
};