import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./MonProfils.module.scss";
import Information from "./Information";
import { useGlobalContext } from "@/store/globalcontext";
import Participation from "./Participations";
export default function MonProfilsContainer() {
  const { user, setUser } = useGlobalContext();
  return (
    <>
      <Head>
        <title>XC Couronne | Mon Profils</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Information isVisitor={false} data={user} setUser={setUser} />
          <Participation
            data={user?.participations}
            user={user}
            setUser={setUser}
          />
          {/* <Stats participations={user?.participations} /> */}
        </div>
      </main>
    </>
  );
}
