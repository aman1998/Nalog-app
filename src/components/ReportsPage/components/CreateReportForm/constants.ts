import { TOldReportOptionData } from "store/reports/types";

import i18n from "../../../../i18n";

export const initialValue: TOldReportOptionData = {
  year: 2021,
  tax_authority: "",
  oktmo_code: "",
  inn: "",
  first_name: "",
  last_name: "",
  patronymic_name: "",
  phone: "",
  birth_date: "",
  birth_place: "",
  passport_series: "",
  passport_number: "",
  passport_issued_by: "",
  passport_date_issued: "",
};

const generateYearsOptions = ()=>{
  const result = [];
  // eslint-disable-next-line no-console
  for(let year = 2021; year <= 2021; year++) {
    result.push({
      value: year,
      label: `${year} ${i18n.t("naming.year")}`
    });
  }
  return result;
};

export const yearsOptions = generateYearsOptions();
