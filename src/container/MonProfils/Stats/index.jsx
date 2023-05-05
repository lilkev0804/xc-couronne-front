import React from "react";
import styles from "./Stats.module.scss";
export default function Stats({ participations }) {
  return (
    <div className={styles.containerMain}>
      <div className={styles.titleContainer}>
        <h2>Statistiques</h2>
      </div>
    </div>
  );
}
