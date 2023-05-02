import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Profils.module.scss";

import { useGlobalContext } from "@/store/globalcontext";
import Information from "../MonProfils/Information";
import Participation from "../MonProfils/Participations";

export default function MonProfilsContainer({ data }) {
  const { user, setUser } = useGlobalContext();

  return (
    <>
      <Head>
        <title>XC Couronne | Mon Profils de {data?.username}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.titleContaienr}>
            <h2>Profils de {data?.username}</h2>
          </div>
          <Information data={user} isVisitor />
          <Participation data={user?.participations} user={user} isVisitor />
        </div>
      </main>
    </>
  );
}
