import { addCourreurParticipation } from "@/ApiCalls/Activites";
import InputText from "@/commons/InputText";
import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import styles from "./Subscription.module.scss";
import { addParticipationUser } from "@/ApiCalls/Users";
import { useGlobalContext } from "@/store/globalcontext";
export default function Subscription({ handleRefesh, user, data }) {
  const { setUser } = useGlobalContext();
  const [frais, setFrais] = useState("");
  const handleSubscription = useCallback(async () => {
    if (!frais) {
      return;
    }

    let participation = user?.participations && [...user?.participations];

    if (!user?.participations) {
      participation = [
        {
          frais: parseFloat(frais),
          idEvent: parseInt(data?.id),
          nomEvent: data?.name,
          date: data?.date,
          discipline: data?.discipline,
          resultatCat: null,
          resultatScratch: null,
        },
      ];
    } else {
      participation.push({
        frais: parseFloat(frais),
        idEvent: parseInt(data?.id),
        nomEvent: data?.name,
        date: data?.date,
        discipline: data?.discipline,
        resultatCat: null,
        resultatScratch: null,
      });
    }
    await addParticipationUser({
      id: parseInt(user?.id),
      participations: participation,
    })
      .then((res) => {
        let oldArray = [...(data?.coureur ?? [])];
        oldArray.push({ id: user?.id, username: user?.username });
        addCourreurParticipation({ id: data?.id, coureur: oldArray })
          .then((res) => {
            setUser({ ...user, participations: participation });
            handleRefesh();
          })
          .catch((err) => console.log("err", err));
      })
      .catch((err) => console.log(err));
  }, [
    data?.coureur,
    data?.date,
    data?.discipline,
    data?.id,
    data?.name,
    frais,
    handleRefesh,
    user,
  ]);

  return (
    <div>
      <h2>Inscrivez-vous à {data?.name}</h2>
      <div className={styles.inputContainer}>
        <InputText
          type={"number"}
          fullWidth={true}
          label={"Frais d'inscription"}
          value={frais}
          onChange={(e) => setFrais(e.target.value)}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button onClick={handleSubscription} fullWidth variant="outlined">
          S&apos;inscrire
        </Button>
      </div>
    </div>
  );
}
