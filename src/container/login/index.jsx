import React, { useCallback, useState } from "react";
import styles from "./LoginContainer.module.scss";
import InputText from "../../commons/InputText";
import MyButton from "@/commons/Button";
import { loginUser } from "@/ApiCalls/Users";
import MyModal from "@/commons/Modal";
import { createNewUser } from "@/ApiCalls/Users";
import { useRouter } from "next/router";
import { useGlobalContext } from "@/store/globalcontext";
export default function LoginContainer() {
  const router = useRouter();
  const { setUser } = useGlobalContext();
  const [errorMessge, setErrorMessage] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [value, setValue] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleConnect = useCallback(async () => {
    await loginUser({ username: value.username, password: value.password })
      .then((res) => {
        setUser(res.data.loginUser);
        localStorage.setItem("user", res.data.loginUser.id);
        router.push("/dashboard");
      })
      .catch((err) => setErrorMessage("Oups identifiants incorrects :("));
  }, [router, setUser, value.password, value.username]);

  const handleCreate = useCallback(async () => {
    setErrorMessage();
    if (value.username.length === 0) {
      setErrorMessage("Pseudo absent !");
      return;
    }
    if (value.password !== value.confirmPassword) {
      setErrorMessage("Mot de passe non identique !");
      return;
    }
    await createNewUser({
      status: "RUNNER",
      username: value.username,
      password: value.password,
      firstConnexion: true,
      encadrant: false,
      email: value.email,
    })
      .then((res) => {
        setModalIsOpen(false);
        setMessage("Votre compte est actif 😀, connectez-vous dès maintenant");
      })
      .catch((err) => setErrorMessage("Une erreur c'est produite!"));
  }, [value.confirmPassword, value.email, value.password, value.username]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2>Connexion</h2>
        {message && (
          <div className={styles.errorContainer}>
            <p>{message}</p>
          </div>
        )}
      </div>
      <div>
        <div className={styles.inputContainer}>
          <InputText
            value={value?.username}
            onChange={(e) => setValue({ ...value, username: e.target.value })}
            fullWidth
            label={"Pseudo"}
          />
        </div>
        <div className={styles.inputContainer}>
          <InputText
            value={value?.password}
            onChange={(e) => setValue({ ...value, password: e.target.value })}
            fullWidth
            label={"Mot de passe"}
            type="password"
          />
        </div>
      </div>
      {errorMessge && (
        <div className={styles.errorContainer}>
          <p className="errorMessage">{errorMessge}</p>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <MyButton onClick={handleConnect} label={"Ce connecter"} />
      </div>
      <div className={styles.buttonCreateContainer}>
        <MyButton
          // disabled
          label={"Créer un compte"}
          onClick={() => setModalIsOpen(!modalIsOpen)}
        />
      </div>
      <MyModal
        open={modalIsOpen}
        handleClose={() => setModalIsOpen(!modalIsOpen)}
      >
        <div>
          <div className={styles.titleContainer}>
            <h2>Création de votre compte</h2>
          </div>
          <div className={styles.inputContainer}>
            <InputText
              value={value?.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              fullWidth
              label={"Email"}
            />
          </div>
          <div className={styles.inputContainer}>
            <InputText
              value={value?.username}
              onChange={(e) => setValue({ ...value, username: e.target.value })}
              fullWidth
              label={"Pseudo"}
            />
          </div>
          <div className={styles.inputContainer}>
            <InputText
              value={value?.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              fullWidth
              label={"Mot de passe"}
              type="password"
            />
          </div>
          <div className={styles.inputContainer}>
            <InputText
              value={value?.confirmPassword}
              onChange={(e) =>
                setValue({ ...value, confirmPassword: e.target.value })
              }
              error={false}
              fullWidth
              label={"Confirmation Mot de passe"}
              type="password"
            />
          </div>
          {errorMessge && (
            <div className={styles.errorContainer}>
              <p className="errorMessage">{errorMessge}</p>
            </div>
          )}

          <div className={styles.buttonContainer}>
            <MyButton onClick={handleCreate} label={"Créer mon compte"} />
          </div>
          <div className={styles.buttonCreateContainer}>
            <MyButton
              label={"Annuler"}
              onClick={() => {
                setModalIsOpen(!modalIsOpen);
                setValue({
                  username: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
            />
          </div>
        </div>
      </MyModal>
    </div>
  );
}
