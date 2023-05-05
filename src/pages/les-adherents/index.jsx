import { getAllUser } from "@/ApiCalls/Users";
import Adherents from "@/container/Adherents";
import React from "react";
export const getServerSideProps = async ({ params, query }) => {
  const req = await getAllUser();
  const data = req.data;
  if (req.errors || !data.getAllUsers) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.getAllUsers,
    },
  };
};

export default function AdherentPage({ data }) {
  return <Adherents data={data} />;
}
