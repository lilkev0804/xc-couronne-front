import React from "react";
import styles from "./Navbar.module.scss";
export default function MyNavBar() {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.logo}>XC Couronne</p>
      </div>
    </div>
  );
}
