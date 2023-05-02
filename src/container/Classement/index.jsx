import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Classement.module.scss";
export default function ClassementContainer() {
  return (
    <>
      <Head>
        <title>XC Couronne | Classement</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}></main>
    </>
  );
}
