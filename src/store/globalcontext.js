import React, { useContext } from "react";

export const globalContext = React.createContext();
export const useGlobalContext = () => useContext(globalContext);
