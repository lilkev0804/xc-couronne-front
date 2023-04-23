import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
export default function MyNavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className={styles.container}>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <div className={styles.menu}>
          <p className={styles.titleMenu}>Menu</p>
          <div className={styles.linkContainer}>
            <Link href={"/dashboard"}>Accueil</Link>
            <Link href={"/mon-profils"}>Mon Profils</Link>
            <Link href={"/activites"}>Les Activités</Link>
            <Link href={"/classement"}>Classements</Link>
            <Link href={"/courreurs"}>Les Courreurs</Link>
          </div>
        </div>
      </Drawer>
      <div className={styles.menuLine}>
        <button
          className={styles.buttonMenu}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <MenuIcon sx={{ color: "white" }} fontSize="large" />
        </button>

        <p className={styles.logo}>XC Couronne</p>
      </div>
    </div>
  );
}
