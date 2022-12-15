import { FC } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import Button from "components/Buttons/Button";

import { setReportModals } from "store/reports/reducers";

export type StepWidgetHeaderDesktop = {
  title: string;
  loading?: boolean;
  disableNext?: boolean;
  next?: () => void;
  nextButton?: string;
}

const StepWidgetHeaderDesktop: FC<StepWidgetHeaderDesktop> = (
  {
    title,
    next,
    loading,
    nextButton,
    disableNext,
  }
) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return <div className="step-widget__header-desktop">
    <h1 className="step-widget__title">{title}</h1>
    <div className="step-widget__btns">
      <Button
        className="step-widget__btn"
        transparent={true}
        onClick={() => dispatch(setReportModals({ key: "cancelCreate", value: true }))}
        title={t("action.cancel")}
      />
      <Button
        className="step-widget__btn"
        disabled={loading || disableNext || !next}
        loading={loading}
        onClick={next}
        title={nextButton}
      />
    </div>
  </div>;
};

export default StepWidgetHeaderDesktop;
