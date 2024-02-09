import React, { PropsWithChildren } from "react";
import styles from "./SidebarLayout.module.scss";

import {
  SidebarContextProvider,
  useSidebarContext,
} from "@/context/SidebarContext/SidebarContextProvider";
import { Sidebar, Toolbar } from "@/components/common/";

export type SidebarLayoutProps = PropsWithChildren;

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarContextProvider>
      <SidebarLayoutContent>{children}</SidebarLayoutContent>
    </SidebarContextProvider>
  );
};

const SidebarLayoutContent = ({ children }: SidebarLayoutProps) => {
  const { sidebarOpened } = useSidebarContext();

  return (
    <div className={styles.container}>€
      <div
        className={`${styles.sidebarContainer} ${
          sidebarOpened ? styles.sidebarOpened : ""
        }`}
      >
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        {/* Toolbar */}
        <div className={styles.toolbarContent}>
          <Toolbar />
        </div>

        {/* Page container */}
        <div
          className={`${styles.pageContainer} ${
            sidebarOpened ? styles.sidebarOpened : ""
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
