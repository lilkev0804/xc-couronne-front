import React, { useEffect, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./Dashboard.module.scss";
import { useGlobalContext } from "@/store/globalcontext";
import Head from "next/head";
import DashBoardCard from "./dashboardCard";
import {
  filterActivitybyMonth,
  filterActivitybyWeek,
} from "@/utils/filterDate";
import ActiviteCard from "@/components/ActiviteCard";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { getWeek } from "date-fns";
import { fr } from "date-fns/locale";

import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#091726",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 18,
    height: 16,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "red" : "#091726",
    boxSizing: "border-box",
  },
}));

export default function DashboardContainer({ data }) {
  const { user } = useGlobalContext();
  const [monthlyActivite, setMonthlyActivite] = useState([]);
  const [weeklyEvent, setWeeklyEvent] = useState([]);
  const [switcher, setSwitcher] = useState({
    onWeek: true,
    onMonthly: false,
  });

  const router = useRouter();
  useEffect(() => {
    setMonthlyActivite(filterActivitybyMonth(data, new Date().getMonth() + 1));
    setWeeklyEvent(
      filterActivitybyWeek(data, getWeek(new Date()), {
        weekStartsOn: 1,
        locale: fr,
      })
    );
  }, [data]);

  return (
    <>
      <Head>
        <title>XC Couronne | Dashdoard</title>
      </Head>
      <MyNavBar />
      <main className={styles.mainContainer}>
        <div className={styles.containerSwitch}>
          <h2>Activités</h2>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography
              fontSize={16}
              color={`${switcher?.onWeek ? "#091726" : "black"}`}
            >
              Hebdomadaire ({weeklyEvent.length})
            </Typography>
            <AntSwitch
              defaultValue={switcher?.onWeek}
              value={switcher?.onWeek}
              onChange={(e) => {
                setSwitcher({
                  onWeek: !switcher.onWeek,
                  onMonthly: !switcher?.onMonthly,
                });
              }}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography
              fontSize={16}
              color={`${switcher?.onMonthly ? "#091726" : "black"}`}
            >
              Mensuelle ({monthlyActivite.length})
            </Typography>
          </Stack>
          <Button onClick={() => router.push("/activites")} variant="outlined">
            Voir plus
          </Button>
        </div>
        {switcher?.onWeek && (
          <div className={styles.containerMiseEnAvant}>
            <div className={styles.containerCard}>
              {weeklyEvent?.map((el, i) => (
                <ActiviteCard key={i} data={el} />
              ))}
            </div>
          </div>
        )}
        {switcher?.onMonthly && (
          <div className={styles.containerMiseEnAvant}>
            <div className={styles.containerCard}>
              {monthlyActivite?.map((el, i) => (
                <ActiviteCard key={i} data={el} />
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
