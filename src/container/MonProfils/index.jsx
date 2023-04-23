import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./MonProfils.module.scss";
export default function MonProfilsContainer() {
  return (
    <>
      <Head>
        <title>XC Couronne | Mon Profils</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}></main>
    </>
  );
}
