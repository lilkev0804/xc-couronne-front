import { getAllCoureur } from "@/ApiCalls/Users";
import CourreursContainer from "@/container/Courreurs";
import React from "react";

export const getServerSideProps = async ({ params, query }) => {
  const req = await getAllCoureur();
  const data = req.data;
  if (req.errors || !data.getAllCoureur) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data.getAllCoureur,
    },
  };
};
export default function Courreurs({ data }) {
  return <CourreursContainer data={data} />;
}
