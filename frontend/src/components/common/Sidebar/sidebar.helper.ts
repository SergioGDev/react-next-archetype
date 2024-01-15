import { Home, List, Settings } from "lucide-react";
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
    ],
  },
  {
    title: "User Menu",
    vLinks: [
      {
        name: "Settings",
        icon: Settings,
        path: "/dashboard/settings",
      }
    ],
  },
];
