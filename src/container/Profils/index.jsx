import React from "react";
import styles from "./Profils.module.scss";
import Head from "next/head";
import MyNavBar from "../Navbar";
export default function ProfilsPage({ data }) {
  return (
    <>
      <Head>
        <title>XC Couronne | Mon Profils de {data?.username}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}></main>
    </>
  );
}
