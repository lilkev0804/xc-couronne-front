import { getActivitiesById } from "@/ApiCalls/Activites";
import ActivitePage from "@/container/Activite";
import React from "react";

export const getServerSideProps = async ({ params, query }) => {
  const req = await getActivitiesById({ id: params.id });
  const data = req.data;
  if (req.errors || !data.getActivitiesById) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: data.getActivitiesById,
    },
  };
};

export default function Activite({ data }) {
  return <ActivitePage data={data?.[0]} />;
}
