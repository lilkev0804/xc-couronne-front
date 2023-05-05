import React, { useCallback, useState } from "react";
import styles from "./Navbar.module.scss";
import { Button, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/store/globalcontext";
export default function MyNavBar() {
  const router = useRouter();
  const { user, setUser } = useGlobalContext();
  const [openMenu, setOpenMenu] = useState(false);

  const handleDisconnect = useCallback(() => {
    router.push("/");
    localStorage.removeItem("user");
    setUser({});
  }, [router, setUser]);
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
            <Button variant="outlined" onClick={handleDisconnect}>
              Deconnexion
            </Button>
          </div>
        </div>
      </Drawer>
      <div className={styles.menuLine}>
        {user && (
          <button
            className={styles.buttonMenu}
            onClick={() => setOpenMenu(!openMenu)}
          >
            <MenuIcon sx={{ color: "white" }} fontSize="large" />
          </button>
        )}

        <p className={styles.logo}>XC Couronne</p>
      </div>
    </div>
  );
}
