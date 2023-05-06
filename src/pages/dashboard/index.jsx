import { getAllActivities } from "@/ApiCalls/Activites";
import DashboardContainer from "@/container/Dashboard";
import React from "react";

export const getServerSideProps = async () => {
  const req = await getAllActivities();
  const data = req.data;
  if (req.errors || !data.getAllActivities) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: data.getAllActivities,
    },
  };
};

export default function DashBoard({ data }) {
  return <DashboardContainer data={data} />;
}
