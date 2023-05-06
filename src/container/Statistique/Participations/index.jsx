import React, { useEffect, useState } from "react";
import styles from "../Statistique.module.scss";
import { filterbyYear } from "@/utils/filterDate";
import Image from "next/image";

export default function Participations({ data }) {
  const [localData, setLocalData] = useState([]);
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>TOP 5</h2>
        <h4>Classement participations {new Date().getFullYear()}</h4>
      </div>
      <div className={styles.containercard}>
        {localData.map((el, i) => (
          <div className={styles.whiteCard} key={i}>
            <div className={styles.textcenter}>
              <span className={styles.textRed}>
                {el?.participations?.length}
              </span>
            </div>
            <Image
              alt="avatar"
              src={`/assets/avatar/${el?.avatar}`}
              width={180}
              height={250}
            />
            <div className={styles.namAndLastNameContainer}>
              <p>{el.prenom}</p>
              <p>{el.nom}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
