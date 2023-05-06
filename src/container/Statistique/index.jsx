import Head from "next/head";
import React, { useEffect, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./Statistique.module.scss";
import General from "./General";
import Participations from "./Participations";
import Podium from "./Podium";
import { filterbyYear } from "@/utils/filterDate";
export default function StatistiqueContainer({ data }) {
  const [yearData, setYearData] = useState([]);
  useEffect(() => {
    setYearData(filterbyYear(data, new Date().getFullYear()));
  }, [data]);
  return (
    <>
      <Head>
        <title>XC Couronne | Statistiques</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}>
        <div className={styles.mainContainer}>
          <General data={data} />
        </div>
        <div className={styles.mainContainer}>
          <Participations data={yearData} />
        </div>
        <div className={styles.mainContainer}>
          <Podium data={yearData} />
        </div>
      </main>
    </>
  );
}
