import { Group, Home, List, Settings } from "lucide-react";
import { SidebarSectionType } from "./sidebar.types";

export const SidebarLinks: SidebarSectionType[] = [
  {
    title: "Main Menu",
    vLinks: [
      {
        name: "Home",
        icon: Home,
        path: "/dashboard/home",
      },
      {
        name: "User List",
        icon: List,
        path: "/dashboard/user-list",
      },
      {
        name: "Groups",
        icon: Group,
        path: "/dashboard/groups",
      },
    ],
  },
  {
    title: "User Menu",
    vLinks: [
      {
        name: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
      },
    ],
  },
];

export const isSectionActive = (
  pathname: string | null,
  sectionName: string
) => {
  return pathname
    ? pathname.split("/")[2] === sectionName.split("/")[2]
    : false;
};
