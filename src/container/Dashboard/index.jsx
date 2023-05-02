import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Dashboard.module.scss";
import { useGlobalContext } from "@/store/globalcontext";
import Head from "next/head";
import DashBoardCard from "./dashboardCard";
export default function DashboardContainer() {
  const { user } = useGlobalContext();

  return (
    <>
      <Head>
        <title>XC Couronne | Dashdoard</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}>
        <div>
          <h2>Coureurs</h2>
        </div>
        <div className={styles.container}>
          <DashBoardCard target={`/mon-profils`} label={"Mon Profils"} />
          <DashBoardCard target={`/activites`} label={"Activités"} />
          <DashBoardCard target={`/classement`} label={"Classements"} />
          <DashBoardCard target={`/courreurs`} label={"Les coureurs"} />
        </div>
        {user?.admin && (
          <>
            <div>
              <h2>Administrateur</h2>
            </div>
            <div className={styles.container}>
              <DashBoardCard target={`/mon-profils`} label={"Comptabilité"} />
              <DashBoardCard target={`/activites`} label={"Commande produit"} />
            </div>
          </>
        )}
      </main>
    </>
  );
}
