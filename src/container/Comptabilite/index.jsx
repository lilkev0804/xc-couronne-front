import React from "react";
import styles from "./Comptibilite.module.scss";
import Head from "next/head";
import MyNavBar from "../Navbar";

export default function ComptabilitePage() {
  return (
    <>
      <Head>
        <title>XC Couronne | Comptabilité</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}></main>
    </>
  );
}
