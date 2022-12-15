import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

import BNNumericInput from "components/BNNumericInput";
import BNInput from "components/BNInput";
import Button from "components/Buttons/Button";

import { TNewReportOptionData } from "store/reports/types";
import {
  createPersonalFailureSelector,
  getSinglePersonalDataDataSelector,
  createPersonalFetchingSelector,
  createPersonalCompleteFetchingSelector,
  createDocumentIsAnonymousSelector
} from "store/reports/selectors";
import {
  getSinglePersonalDataRequest,
  createPersonalDataRequest,
  createPersonalDataFailure
} from "store/reports/reducers";
import { analyticEvent } from "store/analytics/effects";
import { EEventType } from "store/analytics/types";

import { CreateNewReportSchema, CreateAnonymousNewReportSchema } from "./validation";
import { TStepThreeProps } from "./types";
import { getInitialValues } from "./constants";

const StepThreeForm: FC<TStepThreeProps> = ({ formikRef }) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const parsedErrors = useSelector(createPersonalFailureSelector)?.parsedErrors;
  const data = useSelector(getSinglePersonalDataDataSelector(id));
  const loading = useSelector(createPersonalFetchingSelector);
  const loadingComplete = useSelector(createPersonalCompleteFetchingSelector);
  const isAnonymous = useSelector(createDocumentIsAnonymousSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSinglePersonalDataRequest(id));
  }, []);

  const onFocus = () => {
    dispatch(createPersonalDataFailure(null));
  };

  return (
    <Formik<TNewReportOptionData>
      innerRef={formikRef}
      initialValues={getInitialValues(data)}
      validationSchema={isAnonymous ? CreateAnonymousNewReportSchema : CreateNewReportSchema}
      onSubmit={(values: TNewReportOptionData) => {
        dispatch(createPersonalDataRequest({ id, isAnonymous, ...values }));
      }}
    >
      <Form className="create-document__step-three__form">
        <div className="create-document__step-three__form-flex">
          <BNNumericInput
            wrapperClass="ifns-wrapper-class"
            name="ifns"
            label={t("createReport.codeIFTS")}
            maxLength={4}
            error={parsedErrors?.ifns}
            onFocus={onFocus}
            analyticOnError={() => {
              dispatch(analyticEvent(EEventType.TAXREPORT_STEP3_IFNS_ERROR));
            }}
          />
          <BNNumericInput
            wrapperClass="oktmo-wrapper-class"
            name="oktmo"
            label={t("createReport.municipalityOKTMO")}
            maxLength={8}
            error={parsedErrors?.oktmo}
            onFocus={onFocus}
            analyticOnError={() => {
              dispatch(analyticEvent(EEventType.TAXREPORT_STEP3_OKTMO_ERROR));
            }}
          />
        </div>
        <p className="create-document__step-three__form-text"
          dangerouslySetInnerHTML={{ __html: t("createReport.linkText") }} />
        <div className="create-document__step-three__form-line" />
        <h2 className="create-document__step-three__form-title">1. {t("createReport.taxpayerData")}</h2>
        <BNNumericInput
          wrapperClass="inn-wrapper-class"
          name="inn"
          label={t("createReport.inn")}
          maxLength={12}
          error={parsedErrors?.inn}
          onFocus={onFocus}
          analyticOnError={() => {
            dispatch(analyticEvent(EEventType.TAXREPORT_STEP3_INN_ERROR));
          }}
        />
        <BNInput
          type="text"
          name="last_name"
          label={t("naming.lastName")}
          error={parsedErrors?.last_name}
          onFocus={onFocus}
        />
        <BNInput
          type="text"
          name="first_name"
          label={t("naming.firstName")}
          error={parsedErrors?.first_name}
          onFocus={onFocus}
        />
        <BNInput
          type="text"
          name="middle_name"
          label={t("naming.patronymicName")}
          error={parsedErrors?.middle_name}
          onFocus={onFocus}
        />
        <div className="create-document__step-three__form-flex create-document__step-three__form--date-phone">
          <BNInput
            type="text"
            label={t("date.birth")}
            name="birthdate"
            placeholder={t("date.birthPlaceholder")}
            mask="11.11.1111"
            wrapperClass="date-wrapper-class"
            error={parsedErrors?.birthdate}
            disabled={loading}
            onFocus={onFocus}
          />
          <BNInput
            wrapperClass="phone-wrapper-class"
            type="text"
            name="phone"
            label={t("naming.phone")}
            error={parsedErrors?.phone}
            mask="+7 (111) 111 11 11"
            placeholder=""
            onFocus={onFocus}
          />
        </div>
        <div className="create-document__step-three__form-line" />
        <h2 className="create-document__step-three__form-title">2. {t("createReport.passportData")}</h2>
        <div className="create-document__step-three__form-flex create-document__step-three__form--passport">
          <BNNumericInput
            wrapperClass="passport_series-wrapper-class"
            name="passport_series"
            label={t("createReport.series")}
            maxLength={4}
            onFocus={onFocus}
          />
          <BNNumericInput
            wrapperClass="passport_number-wrapper-class"
            name="passport_number"
            label={t("createReport.passportNumber")}
            maxLength={6}
            onFocus={onFocus}
          />
        </div>
        <Button
          disabled={loading || loadingComplete}
          htmlType="submit"
          loading={loading || loadingComplete}
          title={t("action.generateDeclaration")}
          className="create-document__step-three__form-btn"
        />
      </Form>
    </Formik>
  );
};

export default StepThreeForm;
