import { getReportSinglePath, paths } from "config/paths";

import { TBreadcrumbItem } from "components/BNBreadcrumb/types";

import i18n from "../../i18n";

export const getBreadcrumbItems = (id: string): TBreadcrumbItem[] =>  [
  { to: paths.DOCUMENTS, label: i18n.t("naming.documents") },
  { to: getReportSinglePath(id), label: i18n.t("naming.declarationFor", { year: 2021 }) },
  { label: i18n.t("naming.declarationOperationsFor", { year: 2021 }) },
];
