import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Switch } from "antd";

import { createPersonalDataFailure, changeCreateDocumentAnonymousStatus } from "store/reports/reducers";
import { createPersonalFailureSelector, createDocumentIsAnonymousSelector } from "store/reports/selectors";

import StepThreeForm from "./components/StepThreeForm";

const StepThree: FC<{ formikRef: any }> = ({ formikRef }) => {
  const { t } = useTranslation();
  const errors = useSelector(createPersonalFailureSelector);
  const isAnonymous = useSelector(createDocumentIsAnonymousSelector);

  const dispatch = useDispatch();

  const handleSwitcherChange = () => {
    if(!!errors) {
      dispatch(createPersonalDataFailure(null));
    }
    formikRef?.current?.setErrors({});

    dispatch(changeCreateDocumentAnonymousStatus(!isAnonymous));
  };

  return (
    <section className="create-document__step-three__wrapper">
      <div className="create-document__step-three create-document__step-three__container">
        <div className="create-document__step-three__header">
          <div className="create-document__step-three__header-anonymous">
            <h3 className="create-document__step-three__header-anonymous__title">
              {t("createReportStepThree.anonymously")}
            </h3>
            <Switch
              checked={isAnonymous}
              onChange={handleSwitcherChange}
              className="default-switcher create-document__step-three__header-anonymous__switcher"
            />
          </div>
          <p className="create-document__step-three__header-text">
            {t("createReportStepThree.text")}
          </p>
        </div>
        <StepThreeForm formikRef={formikRef} />
      </div>
    </section>
  );
};

export default StepThree;
