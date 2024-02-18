import { Group, Home, List, Settings } from "lucide-react";
import { SidebarSectionType } from "./sidebar.types";
import { Role } from "@/types/roles.types";

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
        roles: ['ADMIN_ROLE']
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

export const showSection = (actualRole?: Role, roles?: Role[]): boolean => {
  if (!roles) return true;
  if (!actualRole) return false;
  return roles.includes(actualRole);
}