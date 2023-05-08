export const filterActiviteType = (data, target) => {
  const res = data?.filter((el) => el?.discipline === target);
  return res;
};

export const filterPodium = (data, byRunner) => {
  if (byRunner) {
    if (data?.participations.length > 0) {
      const res = data.participations.filter(
        (i) =>
          i?.resultatScratch && i.resultatScratch > 0 && i.resultatScratch < 4
      );
      return res?.length;
    }
    return 0;
  }
  if (data?.participations?.length > 5) {
    const res = data?.map((el) => ({
      ...el,
      participations: el.participations.filter(
        (i) =>
          i?.resultatScratch && i.resultatScratch > 0 && i.resultatScratch < 4
      ),
    }));
    return res;
  }

  return 0;
};
