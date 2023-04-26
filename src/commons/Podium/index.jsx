import React from "react";
import styles from "./Podium.module.scss";
export default function Podium() {
  return (
    <div className={styles.container}>
      <div className={styles.firstPlace}>1</div>
      <div className={styles.sdAndThdPlace}>
        <div className={styles.secondPlace}>2</div>
        <div className={styles.thirdPlace}>3</div>
      </div>
    </div>
  );
}
