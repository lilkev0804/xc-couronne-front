import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Courreurs.module.scss";
export default function CourreursContainer() {
  return (
    <>
      <Head>
        <title>XC Couronne | Courreurs</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}></main>
    </>
  );
}
