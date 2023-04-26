import { addCourreurParticipation } from "@/ApiCalls/Activites";
import InputText from "@/commons/InputText";
import { Button } from "@mui/material";
import React, { useCallback, useState } from "react";
import styles from "./Subscription.module.scss";
import { addParticipationUser } from "@/ApiCalls/Users";
export default function Subscription({ name, user, data }) {
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
        },
      ];
    } else {
      participation.push({
        frais: parseFloat(frais),
        idEvent: parseInt(data?.id),
      });
    }

    await addParticipationUser({
      id: parseInt(user?.id),
      participations: participation,
    })
      .then(() => {
        let oldArray = [...(data?.coureur ?? [])];
        oldArray.push({ id: user?.id, username: user?.username });
        addCourreurParticipation({ id: data?.id, coureur: oldArray })
          .then((res) => window.location.reload())
          .catch((err) => console.log("err", err));
      })
      .catch((err) => console.log(err));
  }, [
    data?.coureur,
    data?.id,
    frais,
    user?.id,
    user?.participations,
    user?.username,
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
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}
