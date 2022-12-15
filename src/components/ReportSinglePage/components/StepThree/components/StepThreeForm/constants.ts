import { TNullable } from "config/types";

import { TNewReportOptionData } from "store/reports/types";

export const getInitialValues = (data: TNullable<TNewReportOptionData>): TNewReportOptionData => ({
  ifns: data?.ifns || "",
  oktmo: data?.oktmo || "",
  inn: data?.inn || "",
  first_name: data?.first_name || "",
  last_name: data?.last_name || "",
  middle_name: data?.middle_name || "",
  phone: data?.phone || "",
  birthdate: data?.birthdate || "",
  passport_series: data?.passport_series || "",
  passport_number: data?.passport_number || "",
});
