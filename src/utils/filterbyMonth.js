export const filterActivitybyMonth = (activite, month) => {
  const filter = activite?.filter(
    (el) => new Date(el?.date).getMonth() + 1 === month
  );

  return filter;
};
