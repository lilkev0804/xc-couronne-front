import "../styles/global.scss";
import { globalContext } from "../store/globalcontext";
import { useState } from "react";
export default function App({ Component, pageProps }) {
  const [user, setUser] = useState();
  return (
    <globalContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <Component {...pageProps} />
    </globalContext.Provider>
  );
}
