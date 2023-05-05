import { getActivitiesById } from "@/ApiCalls/Activites";
import ActivitePage from "@/container/Activite";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

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
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const [val, setVal] = useState();

  useEffect(() => {
    setVal(data[0]);
    setLoad(false);
  }, [data]);

  const handleReshetActivitie = useCallback(async () => {
    await getActivitiesById({ id: router?.query?.id }).then((res) =>
      setVal(res.data.getActivitiesById[0])
    );
  }, [router?.query?.id]);

  if (load) {
    return;
  }
  return <ActivitePage data={val} handleRefesh={handleReshetActivitie} />;
}
