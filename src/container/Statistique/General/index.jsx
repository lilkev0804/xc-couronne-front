import React, { useEffect, useState } from "react";
import styles from "../Statistique.module.scss";
import { filterbyMonth } from "@/utils/filterDate";
import Image from "next/image";
import { filterActiviteType } from "@/utils/filterActiviteType";

export default function General({ data }) {
  const [localData, setLocalData] = useState([]);
  useEffect(() => {
    setLocalData(
      filterbyMonth(data, new Date().getMonth(), new Date().getFullYear())
    );
  }, [data]);
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Statistiques</h2>
        <h4>Mois précédent</h4>
      </div>
      <div className={styles.containercard}>
        {localData.map((el, i) => (
          <div className={styles.whiteCard} key={i}>
            <div>
              <p className={styles.textRed}>
                Part : {el.participations.length}
              </p>
            </div>
            <Image
              alt="avatar"
              src={`/assets/avatar/${el?.avatar}`}
              width={180}
              height={250}
            />
            <div className={styles.countInfoParticipation}>
              <p>
                Course XCO :{" "}
                {filterActiviteType(el.participations, "XCO").length}{" "}
              </p>
              <p>
                Course XCM :{" "}
                {filterActiviteType(el.participations, "XCM").length}{" "}
              </p>
              <p>
                Rando :
                {filterActiviteType(el.participations, "Randonnée").length}{" "}
              </p>
              <p>
                Cyclo-Coss :{" "}
                {filterActiviteType(el.participations, "Cyclo-cross").length}{" "}
              </p>
              <p>
                Route : {filterActiviteType(el.participations, "Route").length}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
