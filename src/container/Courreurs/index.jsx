import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Courreurs.module.scss";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import RiderCard from "@/commons/RiderCard";
export default function CourreursContainer({ data }) {
  return (
    <>
      <Head>
        <title>XC Couronne | Courreurs</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <Brightness1Icon sx={{ color: "black", fontSize: 50 }} />
          <h2>Les blacks</h2>
          <Brightness1Icon sx={{ color: "black", fontSize: 50 }} />
        </div>
        <div className={styles.gridCard}>
          {data?.map((el, i) => (
            <div key={i} className={styles.cardContainer}>
              <RiderCard data={el} fullCard={true} isWhite={false} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
