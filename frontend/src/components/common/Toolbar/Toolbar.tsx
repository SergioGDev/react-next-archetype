import styles from "./Toolbar.module.scss";
import { useSidebarContext } from "@/context/SidebarContext/SidebarContextProvider";
import { Menu } from "lucide-react";

export const Toolbar = () => {
  const { sidebarOpened, setSidebarOpened } = useSidebarContext();

  return (
    <div className={`${styles.toolbarContainer} ${sidebarOpened && styles.sidebarOpened}`}>
      <button
        className={styles.menuButton}
        onClick={() => {
          setSidebarOpened(!sidebarOpened);
        }}
      >
        <Menu />
      </button>
    </div>
  );
};
