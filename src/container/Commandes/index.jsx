import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Commandes.module.scss";

export default function CommandePage() {
  return (
    <>
      <Head>
        <title>XC Couronne | Commandes</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}></main>
    </>
  );
}
