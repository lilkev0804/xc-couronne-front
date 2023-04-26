import Head from "next/head";
import React from "react";
import MyNavBar from "../Navbar";
import styles from "./Activities.module.scss";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import ActiviteCard from "@/components/ActiviteCard";
import FilterActivites from "./filter";
export default function ActivitiesContainer({ data }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>XC Couronne</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => router.push("/activites/ajouter")}
              variant="outlined"
            >
              Ajouter une activitée
            </Button>
          </div>
          {/* <FilterActivites /> */}
          <div className={styles.containerCard}>
            {data?.map((el, i) => (
              <ActiviteCard key={i} data={el} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
