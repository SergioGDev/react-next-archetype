import { LucideIcon } from 'lucide-react';

export type SidebarSectionType = {
    title: string;
    vLinks: SidebarSectionItem[];
};

export type SidebarSectionItem = {
    name: string;
    icon: LucideIcon;
    path?: string;
    subItems?: SidebarSectionItem[];
};