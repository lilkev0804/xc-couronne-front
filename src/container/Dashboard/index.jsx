import React, { useEffect, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./Dashboard.module.scss";
import { useGlobalContext } from "@/store/globalcontext";
import Head from "next/head";
import DashBoardCard from "./dashboardCard";
import { filterActivitybyMonth } from "@/utils/filterbyMonth";
import ActiviteCard from "@/components/ActiviteCard";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function DashboardContainer({ data }) {
  const { user } = useGlobalContext();
  const [monthlyActivite, setMonthlyActivite] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setMonthlyActivite(filterActivitybyMonth(data, new Date().getMonth() + 1));
  }, [data]);

  return (
    <>
      <Head>
        <title>XC Couronne | Dashdoard</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}>
        <div className={styles.containerMiseEnAvant}>
          <div className={styles.titleContainer}>
            <h2>Activités du mois </h2>
            <Button
              onClick={() => router.push("/activites")}
              variant="outlined"
            >
              Voir plus
            </Button>
          </div>
          <div className={styles.containerCard}>
            {monthlyActivite?.map((el, i) => (
              <ActiviteCard key={i} data={el} />
            ))}
          </div>
        </div>
        {user?.admin && (
          <>
            <div className={styles.titleContainer}>
              <h2>Administrateur</h2>
            </div>
            <div className={styles.container}>
              <DashBoardCard target={`/mon-profils`} label={"Comptabilité"} />
              <DashBoardCard target={`/activites`} label={"Commande produit"} />
              <DashBoardCard
                target={`/les-adherents`}
                label={"Les adhérents"}
              />
              <DashBoardCard target={`/les-adherents`} label={"Recap"} />
            </div>
          </>
        )}
      </main>
    </>
  );
}
