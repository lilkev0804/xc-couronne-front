import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./Adherents.module.scss";
import AdherentCard from "@/commons/AdherentCard";
import SearchBar from "@/components/SearchBar";

export default function Adherents({ data }) {
  const [adherents, setAdherent] = useState([]);
  const [valueName, setName] = useState("");

  useEffect(() => {
    setAdherent(data);
  }, [data]);

  const handleSearch = useCallback(
    (e) => {
      setName(e);

      const res = data?.filter(
        (el) =>
          el.username.includes(e) ||
          el?.email?.includes(e) ||
          el?.nom?.includes(e) ||
          el?.prenom?.includes(e)
      );
      setAdherent(res);
    },
    [data]
  );

  return (
    <>
      <Head>
        <title>XC Couronne | Adhérents</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h2>🏴 Les adherents 🏴</h2>
        </div>
        <div className={styles.filterContainer}>
          <SearchBar
            value={valueName}
            onChange={handleSearch}
            data={adherents}
            placeholder={"Rechercher un adhérent par nom"}
          />
        </div>
        <div className={styles.cardContainer}>
          {adherents.map((el, i) => (
            <AdherentCard key={i} data={el} />
          ))}
        </div>
      </main>
    </>
  );
}
