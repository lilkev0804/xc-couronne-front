import React, { useCallback, useEffect, useState } from "react";
import styles from "./Participation.module.scss";
import { useRouter } from "next/router";
import ModifiedInput from "@/components/ModifiedInput";
import { Button } from "@mui/material";
import { updateUserParticipation } from "@/ApiCalls/Users";
import { useGlobalContext } from "@/store/globalcontext";
export default function Participation({
  data,

  isVisitor = false,
}) {
  const { user, setUser } = useGlobalContext();
  const router = useRouter();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    setEvent(data);
  }, [data]);

  const handleUpdateScratch = useCallback(
    async (value, id) => {
      let el = [...event];
      el[id] = {
        frais: el[id].frais,
        idEvent: el[id].idEvent,
        resultatScratch: parseInt(value),
        resultatCat: el[id].resultatCat,
      };
      await updateUserParticipation({
        id: parseInt(user?.id),
        participations: el,
      })
        .then((res) => setUser({ ...user, participations: el }))
        .catch((err) => console.log(err));
    },
    [event, setUser, user]
  );

  const handleUpdateCat = useCallback(
    async (value, id) => {
      let el = [...event];
      el[id] = {
        frais: el[id].frais,
        idEvent: el[id].idEvent,
        resultatScratch: el[id].resultatScratch,
        resultatCat: parseInt(value),
      };
      await updateUserParticipation({
        id: parseInt(user?.id),
        participations: el,
      })
        .then((res) => setUser({ ...user, participations: el }))
        .catch((err) => console.log(err));
    },
    [event, setUser, user]
  );
  return (
    <div className={styles.containerMain}>
      <div className={styles.titleContainer}>
        <h2>
          {isVisitor ? "Les" : "Mes"} Participations ({event?.length})
        </h2>
      </div>
      <div className={styles.container}>
        {event?.map((el, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.titleContainer}>
              <p className={styles.title}> {el.nomEvent ?? "Non défini"}</p>
              <p className={styles.subtitle}>{el.discipline ?? "Non défini"}</p>
            </div>
            {!isVisitor && (
              <div>
                <p>Frais engager : {el.frais} €</p>
              </div>
            )}
            {el?.discipline !== "Randonnée" && (
              <>
                <div className={styles.modifiedContainer}>
                  <ModifiedInput
                    shin
                    isVisitor={isVisitor}
                    data={
                      el?.resultatScratch === 1
                        ? "🥇 1"
                        : el?.resultatScratch === 2
                        ? "🥈 2"
                        : el.resultatScratch === 3
                        ? "🥉 3"
                        : el?.resultatScratch
                    }
                    label={"Résultat Scratch"}
                    onSubmit={(e) => handleUpdateScratch(e, i)}
                  />
                </div>
                <div className={styles.modifiedContainer}>
                  <ModifiedInput
                    shin
                    isVisitor={isVisitor}
                    data={
                      el?.resultatCat === 1
                        ? "🥇 1"
                        : el?.resultatCat === 2
                        ? "🥈 2"
                        : el.resultatCat === 3
                        ? "🥉 3"
                        : el?.resultatCat
                    }
                    label={"Résultat Catégorie"}
                    onSubmit={(e) => handleUpdateCat(e, i)}
                  />
                </div>
              </>
            )}

            <div
              className={styles.buttonContainer}
              onClick={() => router.push(`/activites/${el.idEvent}`)}
            >
              <Button>Voir </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
