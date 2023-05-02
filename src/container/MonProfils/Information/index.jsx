import React, { useCallback } from "react";
import styles from "./Information.module.scss";
import ModifiedInput from "@/components/ModifiedInput";
import { pratiquesModelEnum } from "@/ENUMS/pratiquesModelEnums";
import { updateUserInformation, updateUserToEncadrant } from "@/ApiCalls/Users";
export default function Information({ data, setUser, isVisitor = false }) {
  const enums = Object.values(pratiquesModelEnum);

  const onSubmitInfoStrava = useCallback(
    async (value) => {
      setUser({
        ...data,
        information: {
          licenceType: data?.information?.licenceType,
          stravaAccount: value,
          bikes: data?.information?.bikes,
          pratiques: data?.information?.pratiques,
        },
      });
      await updateUserInformation({
        id: parseInt(data?.id),
        information: {
          licenceType: data?.information?.licenceType,
          stravaAccount: value,
          bikes: data?.information?.bikes,
          pratiques: data?.information?.pratiques,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [data, setUser]
  );

  const onSubmitInfoLicence = useCallback(
    async (value) => {
      setUser({
        ...data,
        information: {
          licenceType: value,
          stravaAccount: data?.information?.stravaAccount,
          bikes: data?.information?.bikes,
          pratiques: data?.information?.pratiques,
        },
      });
      await updateUserInformation({
        id: parseInt(data?.id),
        information: {
          licenceType: value,
          stravaAccount: data?.information?.stravaAccount,
          bikes: data?.information?.bikes,
          pratiques: data?.information?.pratiques,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [data, setUser]
  );

  const onSubmitEncadrant = useCallback(
    async (value) => {
      setUser({ ...data, encadrant: value });
      await updateUserToEncadrant({
        id: parseInt(data?.id),
        encadrant: value,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [data, setUser]
  );

  const onSubmitInfo = useCallback(
    async (value) => {
      setUser({
        ...data,
        information: {
          licenceType: data?.information?.licenceType,
          stravaAccount: data?.information?.stravaAccount,
          bikes: data?.information?.bikes,
          pratiques: value,
        },
      });
      await updateUserInformation({
        id: parseInt(data?.id),
        information: {
          licenceType: data?.information?.licenceType,
          stravaAccount: data?.information?.stravaAccount,
          bikes: data?.information?.bikes,
          pratiques: value,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [data, setUser]
  );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>{isVisitor ? "Informations" : "Mes informations"}</h2>
      </div>
      <div className={styles.avatarNameContainer}>
        <div className={styles.avatarContainer}></div>
        <div className={styles.nameContainer}>
          <ModifiedInput
            isVisitor={isVisitor}
            data={data?.username}
            label={"Nom d'utilisateur"}
          />
        </div>
        <div className={styles.nameContainer}>
          <ModifiedInput
            isVisitor={isVisitor}
            data={data?.information?.stravaAccount}
            label={"Compte Strava"}
            onSubmit={onSubmitInfoStrava}
          />
        </div>
        <div className={styles.nameContainer}>
          <ModifiedInput
            isVisitor={isVisitor}
            data={data?.information?.licenceType}
            label={"Type de licence"}
            onSubmit={onSubmitInfoLicence}
          />
        </div>
        <div className={styles.nameContainer}>
          <ModifiedInput
            isVisitor={isVisitor}
            typeOfInput={"switch"}
            data={data?.encadrant}
            label={"Encadrant"}
            onSubmit={onSubmitEncadrant}
          />
        </div>
        <div className={styles.nameContainer}>
          <ModifiedInput
            isVisitor={isVisitor}
            itemsData={enums}
            typeOfInput={"select"}
            data={data?.information?.pratiques}
            label={"Pratique"}
            onSubmit={onSubmitInfo}
          />
        </div>
      </div>
    </div>
  );
}
