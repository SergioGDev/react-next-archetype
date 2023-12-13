import React, { useContext } from "react";
import styles from "./DataListContainer.module.scss";
import { useDataContext } from "@/context/DataContext";
import ItemContainer from "../ItemContainer";

const DataListContainer = () => {
  const { dataList } = useDataContext();
  return (
    <div className={styles.container}>
      <h1>Data List Container</h1>
      {dataList.map((item) => (
        <ItemContainer key={`${item.id}-${item.name}`} item={item} />
      ))}
    </div>
  );
};

export default DataListContainer;
