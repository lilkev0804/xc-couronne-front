import { getWeek } from "date-fns";
import { fr } from "date-fns/locale";

export const filterActivitybyMonth = (activite, month) => {
  const filter = activite?.filter(
    (el) => new Date(el?.date).getMonth() + 1 === month
  );
  return filter;
};

export const filterActivitybyWeek = (activite, week) => {
  const filter = activite?.filter(
    (el) =>
      getWeek(new Date(el?.date), {
        weekStartsOn: 1,
        locale: fr,
      }) === week
  );

  return filter;
};

export const filterbyMonth = (data, month, year) => {
  const res = data?.map((el) => ({
    ...el,
    participations: el.participations.filter(
      (i) =>
        new Date(i.date).getMonth() + 1 === month &&
        new Date(i.date).getFullYear() === year
    ),
  }));
  return res;
};

export const filterbyYear = (data, year) => {
  const res = data?.map((el) => ({
    ...el,
    participations: el.participations.filter(
      (i) => new Date(i.date).getFullYear() === year
    ),
  }));
  return res;
};
