import { SidebarContextType } from './sidebarContext.types';

type SidebarAction = { type: 'setSidebarState'; payload: boolean };

export const SidebarContextReducer = (
        state: SidebarContextType, 
        action: SidebarAction
    ): SidebarContextType => {
    switch (action.type) {
        case 'setSidebarState':
            return { sidebarOpened: action.payload };
            
        default:
            return state;
  }
};