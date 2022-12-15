import { FC } from "react";
import { useTranslation } from "react-i18next";

const ReportsEmptyList: FC = () => {
  const { t } = useTranslation();
  return <div className="create-document__empty-list" dangerouslySetInnerHTML={{ __html: t("reportsEmptyList") }}/>;

};

export default ReportsEmptyList;