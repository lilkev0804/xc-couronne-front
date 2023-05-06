export const filterActiviteType = (data, target) => {
  const res = data?.filter((el) => el?.discipline === target);
  return res;
};

export const filterPodium = (data) => {
  const res = data?.map((el) => ({
    ...el,
    participations: el.participations.filter(
      (i) =>
        i?.resultatScratch && i.resultatScratch > 0 && i.resultatScratch < 4
    ),
  }));

  return res;
};
