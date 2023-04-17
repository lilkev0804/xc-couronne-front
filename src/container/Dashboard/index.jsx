import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Dashboard.module.scss";
import { useGlobalContext } from "@/store/globalcontext";
import Head from "next/head";
import DashBoardCard from "./dashboardCard";
export default function DashboardContainer() {
  const user = useGlobalContext();

  return (
    <>
      <Head>
        <title>XC Couronne | Dashdoard</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}>
        <div className={styles.container}>
          <DashBoardCard label={"Profils"} />
          <DashBoardCard label={"Activités"} />
          <DashBoardCard label={"Classements"} />
        </div>
      </main>
    </>
  );
}