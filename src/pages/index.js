import Head from "next/head";
import styles from "../styles/Home.module.scss";
import LoginContainer from "@/container/login";
import MyNavBar from "@/container/Navbar";
import { useGlobalContext } from "@/store/globalcontext";
import { useEffect } from "react";

export default function Home() {
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    setUser();
    localStorage.removeItem("user");
  }, [setUser]);
  return (
    <>
      <Head>
        <title>XC Couronne</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MyNavBar />
      <main className={styles.main}>
        <LoginContainer />
      </main>
    </>
  );
}
