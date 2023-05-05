import { pratiquesModelEnum } from "@/ENUMS/pratiquesModelEnums";

export const formatPratique = (activite) => {
  const array = Object.entries(pratiquesModelEnum).filter(
    (el) => el[1].key === activite
  )[0]?.[1]?.value;

  return array;
};
