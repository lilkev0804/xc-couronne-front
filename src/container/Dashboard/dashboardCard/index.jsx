import React from "react";
import styles from "./dashboardCard.module.scss";
export default function DashBoardCard({ onClick, label, children }) {
  return (
    <div className={styles.container}>
      <h3>{label}</h3>
      <div>{children}</div>
    </div>
  );
}
