export type SidebarContextType = {
    sidebarOpened: boolean;
};

export type SidebarContextProps = SidebarContextType & {
    setSidebarOpened: (value: boolean) => void;
};
