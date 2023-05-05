import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./Activite.module.scss";
import { format, getHours, getMinutes } from "date-fns";
import { Button, Modal } from "@mui/material";
import { useGlobalContext } from "@/store/globalcontext";
import Podium from "@/commons/Podium";
import RiderCard from "@/commons/RiderCard";
import MyModal from "@/commons/Modal";
import Subscription from "./Subscription";
import { addEncadrantEvent } from "@/ApiCalls/Activites";
import Image from "next/image";
import { formatPratique } from "@/utils/formatEnum";
export default function ActivitePage({ data, handleRefesh }) {
  const [isOwner, setIsOwner] = useState();
  const { user } = useGlobalContext();
  const [modalSubscription, setModalSubscription] = useState(false);
  const [modalEncadrant, setModalEncadrant] = useState(false);

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

  const handleAddEncadrant = useCallback(() => {
    setModalEncadrant(true);
  }, []);

  const handleSumbitEncadrant = useCallback(async () => {
    let array = data?.encadrant;
    if (data?.encadrant === null) {
      array = [{ id: user?.id }];
    } else {
      array.push({ id: user?.id });
    }

    await addEncadrantEvent({
      id: parseInt(data?.id),
      encadrant: array,
    })
      .then((res) => {
        handleRefesh();
        setModalEncadrant(false);
      })
      .catch((er) => console.log(err));
  }, [data?.encadrant, data?.id, handleRefesh, user?.id]);

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
          <Subscription
            data={data}
            handleRefesh={() => {
              setModalSubscription(false);
              handleRefesh();
            }}
            user={user}
          />
        </MyModal>
        <MyModal
          handleClose={() => setModalEncadrant(false)}
          open={modalEncadrant}
        >
          <div>
            <p>
              Je confirme bien vouloir m&apos;inscrire comme encadrant à{" "}
              {data?.name}
            </p>
            <div className={styles.actionButton}>
              <Button variant="outlined" onClick={handleSumbitEncadrant}>
                S&apos;inscrire
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setModalEncadrant(false)}
              >
                Annuler
              </Button>
            </div>
          </div>
        </MyModal>
        <div className={styles.hero}>
          <Image
            src={`/assets/${srcImg}.jpeg`}
            alt="visuel"
            fill
            className={styles.img}
          />
          {/* </div> */}
          <div className={styles.containerTitle}>
            <div>
              <p className={styles.title}>{data?.name}</p>
              <p className={styles.title}>{formatPratique(data?.discipline)}</p>
            </div>
          </div>
        </div>
        <div className={styles.mainContainer}>
          <div className={styles.informationContainer}>
            <div className={styles.textContainer}>
              <p>
                <span>🗓️ Date</span> :{" "}
                {format(new Date(data?.date), "dd-MM-yy")}
              </p>
            </div>
            <div className={styles.textContainer}>
              <p>
                <span> 🕐 Horaire de départ</span> :{" "}
                {getHours(new Date(data?.hour))}h
                {getMinutes(new Date(data?.hour)).lenght > 1
                  ? getMinutes(new Date(data?.hour))
                  : `0${getMinutes(new Date(data?.hour))}`}
              </p>
            </div>
            <div className={styles.textContainer}>
              <p>
                <span>📍 Lieu</span> : {data?.ville} ({data?.zipcode})
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
                  {!isOwner && (
                    <Button variant="outlined" onClick={handleSubscription}>
                      S&apos;inscrire
                    </Button>
                  )}
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
                  <p className={styles.titleCard}>🦺 Encadrants</p>
                  {user?.encadrant && (
                    <Button variant="outlined" onClick={handleAddEncadrant}>
                      S&apos;inscrire
                    </Button>
                  )}
                </div>
                <div>
                  {data?.encadrant?.map((el, i) => (
                    <div className={styles.riderCardContainer} key={i}>
                      <RiderCard encadrant data={el} isWhite={true} />
                    </div>
                  ))}
                </div>
              </div>
              {/* <div className={styles.blockContainer}>
                <div className={styles.headerActionBlockContainer}>
                  <p className={styles.titleCard}>👑 Resultats</p>
                </div>
                <div className={styles.podiumContainer}></div>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
