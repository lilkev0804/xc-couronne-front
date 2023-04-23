import React from "react";
import styles from "./ActiviteCard.module.scss";
import { format, getHours, getMinutes } from "date-fns";
import { useRouter } from "next/router";

export default function ActiviteCard({ data }) {
  const router = useRouter();
  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/activites/${data?.id}`)}
    >
      <div className={styles.topCard}>
        <p className={styles.title}>{data?.name}</p>
      </div>
      <div className={styles.bodyCard}>
        <div className={styles.mainInfo}>
          <p className={styles.textMainInfo}>{data?.discipline}</p>
          <p className={styles.textMainInfo}>{data?.distance} km</p>
          <p className={styles.textMainInfo}>D+ {data?.denivele}m</p>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.dateHourContainer}>
            <p>
              {format(new Date(data?.date), "dd-MM-yyyy")} à{" "}
              {getHours(new Date(data?.hour)) +
                `h` +
                getMinutes(new Date(data?.hour))}
            </p>
          </div>
          <div className={styles.localisationContainer}>
            <p>
              {data?.zipcode}, {data?.ville}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
