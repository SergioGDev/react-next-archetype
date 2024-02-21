import React from "react";
import styles from "./Sidebar.module.scss";

import { SidebarLinks, isSectionActive, showSection } from "./sidebar.helper";
import { SidebarSectionItem, SidebarSectionType } from "./sidebar.types";
import { useSidebarContext } from "@/context/SidebarContext/SidebarContextProvider";
import { useAuthContext } from "@/context/AuthContext";

import { LogOut, SidebarClose, SidebarOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Sidebar = () => {
  const pathname = usePathname();
  const { sidebarOpened, setSidebarOpened } = useSidebarContext();
  const { userData, logout } = useAuthContext();

  return (
    <div
      className={`${styles.container} ${sidebarOpened ? styles.active : ""}`}
    >
      <div className={styles.sidebarSubcontainer}>
        <div className={styles.sectionName}>Hi {userData?.name}!</div>
        {SidebarLinks.map(
          ({ title, vLinks }: SidebarSectionType, index: number) => {
            return (
              <div
                className={styles.linkListContainer}
                key={`${index}-${title}`}
              >
                <div className={styles.sectionTitle}>{title}</div>
                {vLinks
                  .filter(
                    ({ path, roles }: SidebarSectionItem) =>
                      (path && showSection(userData?.role, roles)) || !path
                  )
                  .map((linkData: SidebarSectionItem) => {
                    if (linkData.path) {
                      if (showSection(userData?.role, linkData.roles)) {
                        return (
                          <Link
                            key={linkData.name}
                            href={linkData.path}
                            className={`${styles.linkContainer} ${
                              isSectionActive(pathname, linkData.path) &&
                              styles.active
                            }`}
                          >
                            <div className={styles.linkIcon}>
                              <linkData.icon />
                            </div>
                            <div className={styles.linkTitle}>
                              {linkData.name}
                            </div>
                          </Link>
                        );
                      }
                    } else {
                      return (
                        <button
                          className={styles.linkContainer}
                          key={linkData.name}
                        >
                          <div className={styles.linkIcon}>
                            <linkData.icon />
                          </div>
                          <div className={styles.linkTitle}>
                            {linkData.name}
                          </div>
                        </button>
                      );
                    }
                  })}
              </div>
            );
          }
        )}
      </div>

      <div className={`${styles.sidebarSubcontainer} ${styles.colapsarButton}`}>
        <div className={styles.linkListContainer}>
          {/* Logout button */}
          <button className={styles.linkContainer} onClick={() => logout()}>
            <div className={styles.linkIcon}>
              <LogOut />
            </div>
            <div className={styles.linkTitle}>Logout</div>
          </button>

          <button
            onClick={() => {
              setSidebarOpened(!sidebarOpened);
            }}
            className={`${styles.linkContainer} ${
              pathname === "/" ? styles.active : ""
            }`}
          >
            <div className={styles.linkIcon}>
              {sidebarOpened ? <SidebarClose /> : <SidebarOpen />}
            </div>
            <div className={styles.linkTitle}>Colapsar</div>
          </button>
        </div>
      </div>
    </div>
  );
};
