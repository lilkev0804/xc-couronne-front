import Head from "next/head";
import React, { useCallback, useState } from "react";
import MyNavBar from "../Navbar";
import styles from "./AjouterActivite.module.scss";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DatePickerCustom from "@/commons/DatePickerCustome";
import HoursPickerCustom from "@/commons/HoursPickerCustom";
import { useGlobalContext } from "@/store/globalcontext";
import { createNewActivities } from "@/ApiCalls/Activites";
import { useRouter } from "next/router";
import MyModal from "@/commons/Modal";

export default function AjouterActivite() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    error: false,
    message: "",
  });
  const [value, setValue] = useState({
    name: "",
    date: "",
    creator: user?.id,
    discipline: "",
    hour: "",
    ville: "",
    zipcode: "",
    denivele: "",
    distance: "",
  });

  const handleSubmit = useCallback(async () => {
    setModalMessage({
      error: false,
      message: "",
    });
    console.log({
      name: value.name,
      discipline: value.discipline,
      date: value.date,
      creator: user?.id,
      hour: value.hour,
      ville: value?.ville,
      zipcode: value?.zipcode,
      distance: value?.distance,
      denivele: value?.denivele,
    });
    await createNewActivities({
      name: value.name,
      discipline: value.discipline,
      date: value.date,
      creator: user?.id,
      hour: value.hour,
      ville: value?.ville,
      zipcode: value?.zipcode,
      distance: parseInt(value?.distance),
      denivele: parseInt(value?.denivele),
    })
      .then((res) => {
        setModalMessage({
          error: false,
          message: "Votre événement à bien été ajouté 😀",
        });
        setModalOpen(true);
      })
      .catch((er) => {
        setModalMessage({
          error: true,
          message: "Votre événement n'à pu etre ajouté pour le moment 🧐",
        });
        setModalOpen(true);
      });
  }, [
    user?.id,
    value.date,
    value?.denivele,
    value.discipline,
    value?.distance,
    value.hour,
    value.name,
    value?.ville,
    value?.zipcode,
  ]);

  return (
    <>
      <Head>
        <title>XC Couronne</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={"main"}>
        {modalOpen && (
          <MyModal handleClose={() => setModalOpen(false)} open={modalOpen}>
            <div className={styles.containerModal}>
              <h2>{modalMessage?.error ? "Erreur" : "Félicitation"}</h2>
              <div>
                <p>{modalMessage?.message}</p>
              </div>
              <div>
                <Button
                  variant="outlined"
                  onClick={() =>
                    modalMessage?.error
                      ? setModalOpen(false)
                      : router.push("/activites")
                  }
                >
                  Fermer
                </Button>
              </div>
            </div>
          </MyModal>
        )}
        <div className={styles.container}>
          <h2>Ajouter une activitée</h2>
          <div className={styles.selectContainer}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">Discipline</InputLabel>
              <Select
                value={value?.discipline}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Disciplient"
                onChange={(e) =>
                  setValue({ ...value, discipline: e.target.value })
                }
              >
                <MenuItem value={"XCO"}>XCO</MenuItem>
                <MenuItem value={"XCM"}>XCM</MenuItem>
                <MenuItem value={"RANDO"}>Randonnée</MenuItem>
                <MenuItem value={"CYCLOCROSS"}>CX</MenuItem>
                <MenuItem value={"ROAD"}>Route</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.controlInputContainer}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Nom de l'événement"
              variant="outlined"
              value={value?.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
          </div>
          <div className={styles.controlInputContainerInline}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Distance"
              variant="outlined"
              value={value?.distance}
              onChange={(e) => setValue({ ...value, distance: e.target.value })}
            />

            <TextField
              fullWidth
              id="outlined-basic"
              label="Dénivelé + "
              variant="outlined"
              value={value?.denivele}
              onChange={(e) => setValue({ ...value, denivele: e.target.value })}
            />
          </div>
          <div className={styles.controlInputContainer}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Ville"
              variant="outlined"
              value={value?.ville}
              onChange={(e) => setValue({ ...value, ville: e.target.value })}
            />
          </div>
          <div className={styles.controlInputContainer}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Code Postal"
              variant="outlined"
              value={value?.zipcode}
              onChange={(e) => setValue({ ...value, zipcode: e.target.value })}
            />
          </div>
          <div className={styles.controlInputContainer}>
            <DatePickerCustom
              fullWidth
              onChange={(e) => setValue({ ...value, date: e?.$d })}
              value={value?.date}
              label={"Date de l'événement"}
            />
          </div>
          <div className={styles.controlInputContainer}>
            <HoursPickerCustom
              fullWidth
              onChange={(e) => setValue({ ...value, hour: e?.$d })}
              value={value?.hour}
              label={"Heure de l'événement"}
            />
          </div>
          <div className={styles.controlButtonContainer}>
            <Button color="success" variant="outlined" onClick={handleSubmit}>
              Valider
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => router.back()}
            >
              Annuler
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
