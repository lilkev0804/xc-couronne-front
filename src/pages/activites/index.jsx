import { getAllActivities } from "@/ApiCalls/Activites";
import ActivitiesContainer from "@/container/Activities";
import React from "react";

export const getServerSideProps = async ({ params, query }) => {
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

export default function Activites({ data }) {
  return <ActivitiesContainer data={data} />;
}
