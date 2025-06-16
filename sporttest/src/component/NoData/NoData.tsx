import React from "react";
import styles from "./NoData.module.css";

interface NoDataProps {
  title?: string;
  subtitle?: string;
}

export const NoData: React.FC<NoDataProps> = ({
  title = "No Data Found",
  subtitle = "Please Try Again",
}) => {
  return (
    <div className={styles.noDataPlaceholder}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

export default NoData;
