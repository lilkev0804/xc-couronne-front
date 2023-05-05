import React, { useCallback, useEffect } from "react";
import styles from "./AdherentCard.module.scss";
import ModifiedInput from "@/components/ModifiedInput";
import { useState } from "react";
import { updateUserToAdmin, updateUserToEncadrant } from "@/ApiCalls/Users";

export default function AdherentCard({ data }) {
  const [value, setValue] = useState();

  const handlevalidateAdmin = useCallback(
    async (value) => {
      await updateUserToAdmin({
        id: parseInt(data?.id),
        admin: value,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [data?.id]
  );
  const handleValidateEncadrant = useCallback(
    async (value) => {
      await updateUserToEncadrant({
        id: parseInt(data?.id),
        encadrant: value,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    [data]
  );

  useEffect(() => {
    setValue(data);
  }, [data]);

  return (
    <div className={styles.container}>
      <div></div>
      <div>
        <p className={styles.userName}>{value?.username}</p>
      </div>
      <div className={styles.mainContainerModified}>
        <div>
          <ModifiedInput
            label={"Admin"}
            typeOfInput="switch"
            data={value?.admin}
            onSubmit={handlevalidateAdmin}
          />
        </div>
        <div>
          <ModifiedInput
            label={"Encadrant"}
            onSubmit={handleValidateEncadrant}
            typeOfInput="switch"
            data={value?.encadrant}
          />
        </div>
      </div>
    </div>
  );
}
