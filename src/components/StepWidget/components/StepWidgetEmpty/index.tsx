import { FC } from "react";
import { useTranslation } from "react-i18next";

const StepWidgetEmpty: FC = () => {
  const { t } = useTranslation();
  return <div className="step-widget__empty" dangerouslySetInnerHTML={{ __html: t("reportsEmptyList") }}/>;
};

export default StepWidgetEmpty;