import React, { useMemo } from "react";
import styles from "./ActiviteCard.module.scss";
import { format, getHours, getMinutes } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";
import DeniveleIcon from "../../../public/assets/icons/Group.svg";
import DistanceIcon from "../../../public/assets/icons/distance.svg";
import PinIcon from "../../../public/assets/icons/pin.svg";
import HourIcon from "../../../public/assets/icons/hour.svg";
export default function ActiviteCard({ data }) {
  const router = useRouter();

  const srcImg = useMemo(() => {
    if (data?.discipline === "XCO") {
      return "xco";
    }
    if (data?.discipline === "XCM") {
      return "xcm";
    }
    if (data?.discipline === "RANDO") {
      return "rando";
    }
    if (data?.discipline === "ROAD") {
      return "route";
    }
    if (data?.discipline === "CX") {
      return "cx";
    }
  }, [data?.discipline]);
  return (
    <div
      className={styles.container}
      onClick={() => router.push(`/activites/${data?.id}`)}
    >
      <div className={styles.topCard}>
        <Image
          src={`/assets/${srcImg}.jpeg`}
          alt="visuel"
          width={400}
          height={250}
          className={styles.img}
        />
        {/* </div> */}
        <div className={styles.containerTitle}>
          <p className={styles.title}>{data?.name}</p>
        </div>
      </div>
      <div className={styles.bodyCard}>
        <div className={styles.mainInfo}>
          <div className={styles.textAndIcon}>
            <div className={styles.iconContainer}>
              <DistanceIcon className={styles.icon} />
            </div>
            <p className={styles.textMainInfo}>{data?.distance} km</p>
          </div>
          <div className={styles.textAndIcon}>
            <div className={styles.iconContainer}></div>
            <p className={styles.textMainInfo}>{data?.discipline}</p>
          </div>
          <div className={styles.textAndIcon}>
            <div className={styles.iconContainer}>
              <DeniveleIcon className={styles.icon} />
            </div>
            <p className={styles.textMainInfo}>{data?.denivele}m</p>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.dateHourContainer}>
            <div className={styles.textAndIcon}>
              <div className={styles.iconContainer}>
                <HourIcon className={styles.icon} />
              </div>
              <p>
                {getHours(new Date(data?.hour))}h
                {getMinutes(new Date(data?.hour)).lenght > 1
                  ? getMinutes(new Date(data?.hour))
                  : `0${getMinutes(new Date(data?.hour))}`}{" "}
                - {format(new Date(data?.date), "dd-MM-yy")}
              </p>
            </div>
          </div>
          <div className={styles.localisationContainer}>
            <div className={styles.textAndIcon}>
              <div className={styles.iconContainer}>
                <PinIcon className={styles.icon} />
              </div>
              <p>
                {data?.zipcode}, {data?.ville}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
