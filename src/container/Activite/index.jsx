import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./Activite.module.scss";
import { format, getHours, getMinutes } from "date-fns";
import { Button, Modal } from "@mui/material";
import { useGlobalContext } from "@/store/globalcontext";
import Podium from "@/commons/Podium";
import RiderCard from "@/commons/RiderCard";
import MyModal from "@/commons/Modal";
import Subscription from "./Subscription";
export default function ActivitePage({ data }) {
  const [isOwner, setIsOwner] = useState();
  const { user } = useGlobalContext();
  const [modalSubscription, setModalSubscription] = useState(false);
  useEffect(() => {
    const el = data?.coureur?.filter((el) => el.id === user?.id);
    if (el?.length === 0) {
      setIsOwner(false);
    } else {
      setIsOwner(true);
    }
  }, [user?.id, data]);

  const handleSubscription = useCallback(async () => {
    setModalSubscription(true);
  }, []);

  return (
    <>
      <Head>
        <title>XC Couronne</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}>
        <MyModal
          handleClose={() => setModalSubscription(false)}
          open={modalSubscription}
        >
          <Subscription data={data} user={user} />
        </MyModal>
        <div className={styles.hero}>{data?.name}</div>
        <div className={styles.mainContainer}>
          <div className={styles.informationContainer}>
            <div className={styles.textContainer}>
              <p>
                {" "}
                <span>Date</span> : {format(new Date(data?.date), "dd-MM-yy")}
              </p>
            </div>
            <div className={styles.textContainer}>
              <p>
                <span>Horaire de départ</span> :{" "}
                {getHours(new Date(data?.hour))}h
                {getMinutes(new Date(data?.hour)).lenght > 1
                  ? getMinutes(new Date(data?.hour))
                  : `0${getMinutes(new Date(data?.hour))}`}
              </p>
            </div>
            <div className={styles.textContainer}>
              <p>
                <span>Lieu</span> : {data?.ville} ({data?.zipcode})
              </p>
            </div>
          </div>
          <div className={styles.columnContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.blockContainer}>
                <div className={styles.headerActionBlockContainer}>
                  <p className={styles.titleCard}>
                    🦾 Participant {data?.coureur?.lenght > 0 && "s"}
                  </p>
                  {/* {!isOwner && ( */}
                  <Button variant="outlined" onClick={handleSubscription}>
                    S&apos;inscrire
                  </Button>
                  {/* )} */}
                </div>
                <div>
                  {data?.coureur?.map((el, i) => (
                    <div className={styles.riderCardContainer} key={i}>
                      <RiderCard data={el} isWhite={true} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <div className={styles.blockContainer}>
                <div className={styles.headerActionBlockContainer}>
                  <p className={styles.titleCard}>👑 Podium</p>
                </div>
                <div className={styles.podiumContainer}>
                  <Podium />
                </div>
              </div>
              <div className={styles.blockContainer}>
                <div className={styles.headerActionBlockContainer}>
                  <p className={styles.titleCard}>🦺 Encadrants</p>
                </div>
                <div className={styles.podiumContainer}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
