import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./Courreurs.module.scss";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import RiderCard from "@/commons/RiderCard";
import SearchBar from "@/components/SearchBar";
export default function CourreursContainer({ data }) {
  const [localValue, setLocalValue] = useState([]);
  const [valueName, setName] = useState("");
  useEffect(() => {
    setLocalValue(data);
  }, [data]);

  const handleSearch = useCallback(
    (e) => {
      setName(e);

      const res = data?.filter((el) => el.username.includes(e));
      setLocalValue(res);
    },
    [data]
  );
  return (
    <>
      <Head>
        <title>XC Couronne | Courreurs</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h2>🏴 Les blacks 🏴</h2>
        </div>
        <div className={styles.filterContainer}>
          <SearchBar
            value={valueName}
            data={localValue}
            onChange={handleSearch}
            placeholder={"Par nom"}
          />
        </div>
        <div className={styles.gridCard}>
          {localValue?.map((el, i) => (
            <div key={i} className={styles.cardContainer}>
              <RiderCard data={el} fullCard={true} isWhite={false} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
