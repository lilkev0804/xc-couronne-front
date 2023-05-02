import React, { useCallback } from "react";
import styles from "./Participation.module.scss";
import { useRouter } from "next/router";
import ModifiedInput from "@/components/ModifiedInput";
import { Button } from "@mui/material";
import { updateUserParticipation } from "@/ApiCalls/Users";
export default function Participation({
  data,
  user,
  setUser,
  isVisitor = false,
}) {
  const router = useRouter();

  const handleUpdateScratch = useCallback(
    async (value, id) => {
      let el = [...data];
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
    [data, setUser, user]
  );

  const handleUpdateCat = useCallback(
    async (value, id) => {
      let el = [...data];
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
    [data, setUser, user]
  );

  return (
    <div className={styles.containerMain}>
      <div className={styles.titleContainer}>
        <h2>
          {isVisitor ? "Les" : "Mes"} Participations ({data?.length})
        </h2>
      </div>
      <div className={styles.container}>
        {data?.map((el, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.titleContainer}>
              <p className={styles.title}> {el.nomEvent ?? "Non défini"}</p>
            </div>
            {!isVisitor && (
              <div>
                <p>Frais engager : {el.frais} €</p>
              </div>
            )}
            <div className={styles.modifiedContainer}>
              <ModifiedInput
                shin
                isVisitor={isVisitor}
                data={el?.resultatScratch ?? ""}
                label={"Résultat Scratch"}
                onSubmit={(e) => handleUpdateScratch(e, i)}
              />
            </div>
            <div className={styles.modifiedContainer}>
              <ModifiedInput
                shin
                isVisitor={isVisitor}
                data={el.resultatCat ?? ""}
                label={"Résultat Catégorie"}
                onSubmit={(e) => handleUpdateCat(e, i)}
              />
            </div>
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
