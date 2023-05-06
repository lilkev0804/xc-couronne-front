import { getAllCoureur } from "@/ApiCalls/Users";
import StatistiqueContainer from "@/container/Statistique";
import React, { useCallback, useEffect, useState } from "react";

export default function Statistique() {
  const [data, setData] = useState([]);
  const handleCatchAllRunner = useCallback(async () => {
    await getAllCoureur().then((res) => setData(res.data.getAllCoureur));
  }, []);
  useEffect(() => {
    handleCatchAllRunner();
  }, [handleCatchAllRunner]);

  return <StatistiqueContainer data={data} />;
}
