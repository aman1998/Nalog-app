import i18n from "../i18n";

export const declension = (num: number): string => {
  const count = num % 100;
  return `${Math.floor(num)} ${i18n.t("naming.days", { count })}`;
};

