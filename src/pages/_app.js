import "../styles/global.scss";
import { globalContext } from "../store/globalcontext";
import { useCallback, useEffect, useState } from "react";
import { getUserId } from "@/ApiCalls/Users";
import { CircularProgress } from "@mui/material";
export default function App({ Component, pageProps }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const getUser = useCallback(async (idUser) => {
    await getUserId({ id: idUser })
      .then((res) => {
        setUser(res.data?.getUserById[0]);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    const local = localStorage.getItem("user");
    if (local) {
      getUser(local);
      return;
    }
    setLoading(false);
  }, [getUser]);

  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {loading && <CircularProgress />}
      <Component {...pageProps} />
    </globalContext.Provider>
  );
}
