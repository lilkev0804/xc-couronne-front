import { getUserId } from "@/ApiCalls/Users";
import ProfilsPage from "@/container/Profils";
import React from "react";

export const getServerSideProps = async ({ params, query }) => {
  const req = await getUserId({ id: parseInt(params.id) });
  const data = req.data;
  if (req.errors || !data.getUserById) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.getUserById[0],
    },
  };
};

export default function Profil(data) {
  return <ProfilsPage data={data?.data} />;
}
